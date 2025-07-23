export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface YearWithMultipleWinnersResponse {
  years?: YearWithMultipleWinners[];
}

export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface StudiosWithWinCountResponse {
  studios: StudioWithWinCount[];
}

export interface StudioWithWinCount {
  name: string;
  winCount: number;
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducersIntervals {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

export interface MoviesResponse {
  content: Movie[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
  first: boolean;
  empty: boolean;
}
