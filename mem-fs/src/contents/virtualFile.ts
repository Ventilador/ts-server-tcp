import { FsItem } from "./fsItem";
import { Node, WatchCallback } from "@ts-extras/tree-node";
import { Folder } from "./folder";
import { File } from "./file";
import { Stat } from "./stat";
import { fs } from "@ts-extras/types";
const isVirtualFileSymbol = Symbol('VirtualFile');
export type Parser<T extends (...args: any[]) => any> = (...args: Parameters<T>) => string;
export class VirtualFile extends FsItem<string>{
    constructor(public readonly original: Node<FsItem<string>, any>, node: Node<FsItem<string>, any>, private _parser: fs.VirtualFileParser) {
        super(node);
        pipe(node, original);
    }
    public version() {
        return this.original.getContent()!.version();
    }
    public dispose(): void {
        this._parser = null as any;
    }
    public stats() {
        return this.original.getContent()!.stats();
    }
    public isFile(): this is File {
        return true;
    }
    public setStats(_stats: Stat | null) { }
    public isFolder(): this is Folder {
        return false;
    }
    protected getContent(): string {
        return this._parser(this.original.fullPath, this._node.fullPath, this.original.getContent()!.read());
    }
}
(VirtualFile as any).prototype[isVirtualFileSymbol] = true
export function isVirtualFile(val: any): val is VirtualFile {
    return !!(val && val[isVirtualFileSymbol]);
}
function pipe(node: Node<any, any>, to: Node<any, any>) {
    node.watch = function (cb: WatchCallback<FsItem<string>, any>) {
        return to.watch(function (evenName: string) {
            cb(evenName, to);
        });
    };
}