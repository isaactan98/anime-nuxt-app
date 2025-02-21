export class RecentRelease {
    currentPage: number;
    hasNextPage: boolean;
    results: RecentAnime[];
    totalPages: number;

    constructor(
        currentPage: number,
        hasNextPage: boolean,
        totalPages: number,
        results: RecentAnime[] = []
    ) {
        this.currentPage = currentPage;
        this.hasNextPage = hasNextPage;
        this.totalPages = totalPages;
        this.results = results;
    }
}

export class RecentAnime {
    id: string;
    title: string;
    url: string;
    image: string;
    duration: string;
    japaneseTitle: string;
    type: string;
    nsfw: boolean;
    sub: number;
    dub: number;
    episodes: number;

    constructor(
        id: string,
        title: string,
        url: string,
        image: string,
        duration: string,
        japaneseTitle: string,
        type: string,
        nsfw: boolean = false,
        sub: number = 0,
        dub: number = 0,
        episodes: number = 0
    ) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.image = image;
        this.duration = duration;
        this.japaneseTitle = japaneseTitle;
        this.type = type;
        this.nsfw = nsfw;
        this.sub = sub;
        this.dub = dub;
        this.episodes = episodes;
    }
}

export class SpotLights {
    results: SpotLightItem[];

    constructor(results: SpotLightItem[] = []) {
        this.results = results;
    }
}

export class SpotLightItem {
    id: string;
    title: string;
    japaneseTitle: string;
    banner: string;
    rank: number;
    url: string;
    type: string;
    duration: string;
    releaseDate: string;
    quality: string;
    sub: number;
    dub: number;
    episodes: number;
    description: string;

    constructor(
        id: string,
        title: string,
        japaneseTitle: string,
        banner: string,
        rank: number,
        url: string,
        type: string,
        duration: string,
        releaseDate: string,
        quality: string,
        sub: number = 0,
        dub: number = 0,
        episodes: number = 0,
        description: string = "No description available."
    ) {
        this.id = id;
        this.title = title;
        this.japaneseTitle = japaneseTitle;
        this.banner = banner;
        this.rank = rank;
        this.url = url;
        this.type = type;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.quality = quality;
        this.sub = sub;
        this.dub = dub;
        this.episodes = episodes;
        this.description = description;
    }
}

export class TopAiring {
    currentPage: number;
    hasNextPage: boolean;
    results: RecentAnime[];
    totalPages: number;

    constructor(
        currentPage: number,
        hasNextPage: boolean,
        totalPages: number,
        results: RecentAnime[] = []
    ) {
        this.currentPage = currentPage;
        this.hasNextPage = hasNextPage;
        this.totalPages = totalPages;
        this.results = results;
    }
}

export class AnimeInfo {
    id: string;
    image: string;
    description: string;
    episodes: AnimeEpisode[];
    hasDub: boolean;
    hasSub: boolean;
    japaneseTitle: string;
    alID: number; // Assuming this refers to AniList ID
    malID: number; // Assuming this refers to MyAnimeList ID
    recommendations: RecentAnime[];
    relatedAnime: RecentAnime[];
    subOrDub: string;
    title: string;
    totalEpisodes: number;
    type: string;
    url: string;

    constructor(
        id: string,
        image: string,
        description: string,
        episodes: AnimeEpisode[] = [],
        hasDub: boolean = false,
        hasSub: boolean = false,
        japaneseTitle: string = "",
        alID: number = 0,
        malID: number = 0,
        recommendations: RecentAnime[] = [],
        relatedAnime: RecentAnime[] = [],
        subOrDub: string = "sub", // Default to "sub"
        title: string = "",
        totalEpisodes: number = 0,
        type: string = "",
        url: string = ""
    ) {
        this.id = id;
        this.image = image;
        this.description = description;
        this.episodes = episodes;
        this.hasDub = hasDub;
        this.hasSub = hasSub;
        this.japaneseTitle = japaneseTitle;
        this.alID = alID;
        this.malID = malID;
        this.recommendations = recommendations;
        this.relatedAnime = relatedAnime;
        this.subOrDub = subOrDub;
        this.title = title;
        this.totalEpisodes = totalEpisodes;
        this.type = type;
        this.url = url;
    }
}

export class AnimeEpisode {
    id: string;
    isFiller: boolean;
    number: number;
    title: string;
    url: string;

    constructor(
        id: string,
        isFiller: boolean = false,
        number: number = 0,
        title: string = "",
        url: string = ""
    ) {
        this.id = id;
        this.isFiller = isFiller;
        this.number = number;
        this.title = title;
        this.url = url;
    }
}

export class VideoMedia {
    tracks: Subtitle[];
    sources: Sources[];

    constructor(tracks: Subtitle[], sources: Sources[]) {
        this.tracks = tracks;
        this.sources = sources;
    }
}

export class Sources {
    url: string;
    type: string;

    constructor(url: string, type: string) {
        this.url = url;
        this.type = type;
    }
}

export class Subtitle {
    file: string;
    label: string;
    kind: string;
    default: boolean | null;

    constructor(file: string, label: string, kind: string = "subtitles", isDefault: boolean | null = null) {
        this.file = file;
        this.label = label;
        this.kind = kind;
        this.default = isDefault;
    }
}