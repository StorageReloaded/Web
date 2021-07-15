export class Database {
    id: number = 0;
    name: string = "";
}    

export class Location {
    id: number = 0;
    name: string = "";
    database: number = 0;
}

export class Item {
    id: number = 0;
    name: string = "";
    description: string = "";
    image: string = "";
    location: number = 0;
    tags: Array<number> = [];
    amount: number = 0;

    properties_custom: Array<Property> = [];
    properties_internal: Array<Property> = [];
    attachments: Map<string, string> = new Map();

    last_edited: number = 0;
    created: number = 0;
}

export class Property {
    id: number = 0;
    name: string = "";
    value: any;
    display_type: string = "";
}

export class Tag {
    id: number = 0;
    name: string = "";
    color: number = 0;
    icon: number = 0;
}