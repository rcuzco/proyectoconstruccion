export interface Material
{
    ShowGenericImage: boolean;
    MaterialId: number;
    ImageUrl: string;
    Description: string;
    MaterialName: string;
    ImageFile: string | ArrayBuffer | null;

}


export interface MaterialData {
    MaterialID:   number;
    MaterialName: string;
    Description:  string;
    ImageUrl:     string;
}
