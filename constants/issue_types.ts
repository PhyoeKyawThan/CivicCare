export type IssueType = {
    id: number,
    title: string,
    profile_image: string | undefined,
    username: string,
    reported_text: string,
    reported_images: Array<string> | null,
    command_count: number | null,
    is_viewed: boolean,
    reported_date: string
};

export type ImageViewerType = {
    image: string | null,
    visible: boolean,
    onClose: ()=>void
};