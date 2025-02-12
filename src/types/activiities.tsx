interface BaseActivity {
    name: string;
    year: number;
}

export interface Organization extends BaseActivity {
    startYear: number;
    endYear: number;
    positions: Position[];
}

interface Position {
    position: string;
    startYear: number;
    endYear: number;
    description: string[];
}

export interface Achievement extends BaseActivity {
    level: string;
    description: string;
}

export interface Publication extends BaseActivity {
    abstract: string;
}

export type ActivityType = "organization" | "achievement" | "publication";
export type ActivityData = Organization | Achievement | Publication;
