export interface TrombiState {
    files: PictureState[];
    loading: boolean;
    loaded: boolean;
}

export interface PictureState {
    createdAt: string,
    first_name: string,
    id: number,
    label: string,
    last_name: string,
    picture_url: string,
    updatedAt: string,
    userId: number,
    local_url: string | null,
}

export interface PictureUpdateState {
    first_name: string,
    last_name: string,
    label: string,
}