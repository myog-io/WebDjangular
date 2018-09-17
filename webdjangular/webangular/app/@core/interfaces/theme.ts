
export class Theme{

    public name: string;
    public alias: string;
    public module: string;
    public version: string;
    public parent_theme: boolean;

    constructor( private data:any){
        this.name = data.name;
        this.alias = data.alias;
        this.module = data.module;
        this.version = data.version;
        this.parent_theme = data.parent_theme;
    }
}
