export function convertBlobToFile(blob: Blob, fileName:string): File {
    var b: any = blob;
    b.name = fileName;
    return <File>blob;
}