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
    genres: string;

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
        url: string = "",
        genres: string = "",
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
        this.genres = genres;
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
    subtitles: Subtitle[];
    sources: Sources[];
    headers: {
        Referer: string;
    };

    constructor(tracks: Subtitle[], sources: Sources[], headers: any) {
        this.subtitles = tracks;
        this.sources = sources;
        this.headers = headers;
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
    lang: string;
    url: string;

    constructor(file: string, label: string, kind: string = "subtitles", isDefault: boolean | null = null, lang: string, url: string = "") {
        this.file = file;
        this.label = label;
        this.kind = kind;
        this.default = isDefault;
        this.lang = lang;
        this.url = url;
    }
}

export class AniListInfo {
    characters: AniListCharacter[];
    cover: string;
    currentEpisode: number;
    duration: number;
    endDate: {
        year: number;
        month: number;
        day: number;
    };
    genres: string[];
    nextAiringEpisode: {
        airingTime: number;
        episode: number;
        timeUntilAiring: number;
    };
    rating: number;
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    status: string;
    totalEpisodes: number;
    trailer: string;

    constructor(
        characters: AniListCharacter[],
        cover: string,
        currentEpisode: number,
        duration: number,
        endDate: { year: number; month: number; day: number },
        genres: string[],
        rating: number,
        startDate: { year: number; month: number; day: number },
        status: string,
        totalEpisodes: number,
        nextAiringEpisode: { airingTime: number; episode: number; timeUntilAiring: number },
        trailer: string
    ) {
        this.characters = characters;
        this.cover = cover;
        this.currentEpisode = currentEpisode;
        this.duration = duration;
        this.endDate = endDate;
        this.genres = genres;
        this.rating = rating;
        this.startDate = startDate;
        this.status = status;
        this.totalEpisodes = totalEpisodes;
        this.nextAiringEpisode = nextAiringEpisode;
        this.trailer = trailer;
    }
}

export class AniListCharacter {
    id: string;
    image: string;
    name: CharacterName;
    role: string;

    constructor(id: string, image: string, name: CharacterName, role: string) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.role = role;
    }
}

export class CharacterName {
    first: string;
    full: string;
    last: string;
    native: string;
    userPreferred: string;

    constructor(first: string, last: string, native: string, userPreferred: string, full: string) {
        this.first = first;
        this.full = full;
        this.last = last;
        this.native = native;
        this.userPreferred = userPreferred;
    }
}