namespace StoRe {
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
}