import {MainContext} from "../common/mainContext";
import {FlatRepository} from "../common/flats";
import {CityRepository} from "../common/cities";
import {AdType, SsLvCrawler, SsLvCrawlerOptions} from "ss-lv-apartment-crawler";

enum JobStatus {
    Ok,
    Empty,
    Error
}

interface JobResult {
    status: JobStatus;
    error?: string;
    jobParams: SsLvCrawlerOptions;
}

export class Crawler {
    private flatRepository: FlatRepository;
    private cityRepository: CityRepository;
    constructor(private context: MainContext) {
        this.flatRepository = context.createFlatRepository();
        this.cityRepository = context.createCityRepository();
    }

    private async runJobs() {
        const cities = await this.cityRepository.findAllEnabled();
        const adTypes: AdType[] = ['hand_over', 'sell'];
        const promises: Promise<JobResult>[] = [];

        for (const city of cities) {
            for (const adType of adTypes) {
                const jobParams: SsLvCrawlerOptions = {
                    lang: 'ru',
                    adType: adType,
                    city: city.name,
                    interval: 'all',
                    maxConcurrentRequests: 1,
                    requestDelayInMs: 500,
                };
                const crawler = new SsLvCrawler(jobParams)
                const jobPromise: Promise<JobResult> = crawler.run().then(async flats => {
                    if (flats.length) {
                        return {
                            status: JobStatus.Ok,
                            jobParams,
                        }
                    } else {
                        return {
                            status: JobStatus.Empty,
                            jobParams
                        }
                    }
                }).catch(err => ({status: JobStatus.Error, error: String(err), jobParams}));
                promises.push(jobPromise);
            }
        }

        return promises;
    }

    async run() {
        const jobPromises = await this.runJobs();
        return Promise.all(jobPromises).then(jobResults => {
            for (const jobResult of jobResults) {
                console.log(jobResult);
            }
        });
    }
}

export async function runCrawler() {
    const context = await MainContext.create();
    const crawler = new Crawler(context);
    await crawler.run();
    await context.getKnex().destroy();
}
