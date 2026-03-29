export type City = {
    id: number;
    name: string;
}

export type University = {
    id: number;
    name: string;
    cityId: number;
    avatar: string | null;
    city: City;
}
