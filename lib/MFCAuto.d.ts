declare class Client implements NodeJS.EventEmitter {
    sessionId: number;
    username: string;
    password: string;
    uid: number;
    private net;
    private debug;
    private serverConfig;
    private streamBuffer;
    private streamBufferPosition;
    private emoteParser;
    private client;
    private keepAlive;
    private manualDisconnect;
    constructor(username?: string, password?: string);
    addListener: (event: string, listener: Function) => this;
    on: (event: string, listener: Function) => this;
    once: (event: string, listener: Function) => this;
    removeListener: (event: string, listener: Function) => this;
    removeAllListeners: (event?: string) => this;
    getMaxListeners: () => number;
    setMaxListeners: (n: number) => this;
    listeners: (event: string) => Function[];
    emit: (event: string, ...args: any[]) => boolean;
    listenerCount: (type: string) => number;
    private log(msg, debugOnly?);
    private _readData(buf);
    private _packetReceived(packet);
    private _readPacket();
    EncodeRawChat(rawMsg: string, callback: EmoteParserCallback): void;
    private loadFromMFC(url, callback, massager?);
    private ensureEmoteParserIsLoaded(callback);
    private ensureServerConfigIsLoaded(callback);
    TxCmd(nType: FCTYPE, nTo?: number, nArg1?: number, nArg2?: number, sMsg?: string): void;
    static toUserId(id: number): number;
    static toRoomId(id: number): number;
    sendChat(id: number, msg: string, format?: boolean): void;
    sendPM(id: number, msg: string, format?: boolean): void;
    joinRoom(id: number): void;
    leaveRoom(id: number): void;
    connect(doLogin?: boolean, onConnect?: () => void): void;
    login(username?: string, password?: string): void;
    connectAndWaitForModels(onConnect: () => void): void;
    disconnect(): void;
}
declare type EmoteParserCallback = (parsedString: string, aMsg2: {
    txt: string;
    url: string;
    code: string;
}[]) => void;
interface EmoteParser {
    Process(msg: string, callback: EmoteParserCallback): void;
}
interface ServerConfig {
    ajax_servers: string[];
    chat_server: string[];
    h5video_servers: {
        [index: number]: string;
    };
    release: boolean;
    video_servers: string[];
    websocket_servers: {
        [index: string]: string;
    };
}
declare var MAGIC: number;
declare enum STATE {
    FreeChat = 0,
    Away = 2,
    Private = 12,
    GroupShow = 13,
    Online = 90,
    Offline = 127,
}
declare enum DISPLAY {
    'PM_INLINE_WHISPER' = 1,
    'PM_INLINE_ALL' = 2,
}
declare enum EVSESSION {
    'NONE' = 0,
    'PRIVATE' = 1,
    'VOYEUR' = 2,
    'GROUP' = 3,
    'FEATURE' = 4,
    'AWAYPVT' = 5,
    'TIP' = 10,
    'PUBLIC' = 100,
    'AWAY' = 101,
    'START' = 102,
    'UPDATE' = 103,
    'STOP' = 104,
}
declare enum FCACCEPT {
    'NOBODY' = 0,
    'FRIENDS' = 1,
    'ALL' = 2,
    'V2_NONE' = 8,
    'V2_FRIENDS' = 16,
    'V2_MODELS' = 32,
    'V2_PREMIUMS' = 64,
    'V2_BASICS' = 128,
    'V2_ALL' = 240,
}
declare enum FCBAN {
    'NONE' = 0,
    'TEMP' = 1,
    '60DAY' = 2,
    'LIFE' = 3,
}
declare enum FCCHAN {
    'NOOPT' = 0,
    'JOIN' = 1,
    'PART' = 2,
    'ERR_NOCHANNEL' = 2,
    'ERR_NOTMEMBER' = 3,
    'ERR_GUESTMUTE' = 4,
    'OLDMSG' = 4,
    'ERR_GROUPMUTE' = 5,
    'ERR_NOTALLOWED' = 6,
    'ERR_CONTENT' = 7,
    'HISTORY' = 8,
    'CAMSTATE' = 16,
    'LIST' = 16,
    'WELCOME' = 32,
    'BATCHPART' = 64,
    'EXT_USERNAME' = 128,
    'EXT_USERDATA' = 256,
}
declare enum FCERRTYPE {
    'INVALIDUSER' = 10,
    'NOACCESS' = 11,
    'NOSPACE' = 12,
}
declare enum FCGROUP {
    'NONE' = 0,
    'EXPIRED' = 1,
    'BUSY' = 2,
    'EMPTY' = 3,
    'DECLINED' = 4,
    'UNAVAILABLE' = 5,
    'SESSION' = 9,
}
declare enum FCLEVEL {
    'GUEST' = 0,
    'BASIC' = 1,
    'PREMIUM' = 2,
    'MODEL' = 4,
    'ADMIN' = 5,
}
declare enum FCMODE {
    'NOPM' = 0,
    'FRIENDPM' = 1,
    'ALLPM' = 2,
}
declare enum FCMODEL {
    'NONE' = 0,
    'NOGROUP' = 1,
    'FEATURE1' = 2,
    'FEATURE2' = 4,
    'FEATURE3' = 8,
    'FEATURE4' = 16,
    'FEATURE5' = 32,
}
declare enum FCNEWSOPT {
    'NONE' = 0,
    'IN_CHAN' = 1,
    'IN_PM' = 2,
    'AUTOFRIENDS_OFF' = 4,
    'ADDFRIENDS_OFF' = 4,
    'IN_CHAN_NOPVT' = 8,
    'IN_CHAN_NOGRP' = 16,
}
declare enum FCNOSESS {
    'NONE' = 0,
    'PVT' = 1,
    'GRP' = 2,
    'TRUEPVT' = 4,
    'TOKEN_MIN' = 8,
}
declare enum FCOPT {
    'NONE' = 0,
    'BOLD' = 1,
    'ITALICS' = 2,
    'REMOTEPVT' = 4,
    'TRUEPVT' = 8,
    'CAM2CAM' = 16,
    'RGNBLOCK' = 32,
    'TOKENAPPROX' = 64,
    'TOKENHIDE' = 128,
    'RPAPPROX' = 256,
    'RPHIDE' = 512,
    'HDVIDEO' = 1024,
    'MODELSW' = 2048,
    'GUESTMUTE' = 4096,
    'BASICMUTE' = 8192,
    'BOOKMARK' = 16384,
}
declare enum FCRESPONSE {
    'SUCCESS' = 0,
    'ERROR' = 1,
    'NOTICE' = 2,
    'SUSPEND' = 3,
    'SHUTOFF' = 4,
    'WARNING' = 5,
    'QUEUED' = 6,
    'NO_RESULTS' = 7,
    'CACHED' = 8,
    'JSON' = 9,
    'INVALIDUSER' = 10,
    'NOACCESS' = 11,
    'NOSPACE' = 12,
}
declare enum FCSERV {
    'NONE' = 0,
    'VIDEO_CAM2CAM' = 1,
    'VIDEO_MODEL' = 2,
    'VIDEO_RESV2' = 4,
    'VIDEO_RESV3' = 8,
    'CHAT_MASTER' = 16,
    'CHAT_SLAVE' = 32,
    'CHAT_RESV2' = 64,
    'CHAT_RESV3' = 128,
    'AUTH' = 256,
    'AUTH_RESV1' = 512,
    'AUTH_RESV2' = 1024,
    'AUTH_RESV3' = 2048,
    'TRANS' = 4096,
    'TRANS_RESV1' = 8192,
    'TRANS_RESV2' = 16384,
    'TRANS_RESV3' = 32768,
}
declare enum FCTYPE {
    'ANY' = -2,
    'UNKNOWN' = -1,
    'NULL' = 0,
    'LOGIN' = 1,
    'ADDFRIEND' = 2,
    'PMESG' = 3,
    'STATUS' = 4,
    'DETAILS' = 5,
    'TOKENINC' = 6,
    'ADDIGNORE' = 7,
    'PRIVACY' = 8,
    'ADDFRIENDREQ' = 9,
    'USERNAMELOOKUP' = 10,
    'ZBAN' = 11,
    'BROADCASTPROFILE' = 11,
    'BROADCASTNEWS' = 12,
    'ANNOUNCE' = 13,
    'MANAGELIST' = 14,
    'MANAGELISTS' = 14,
    'INBOX' = 15,
    'GWCONNECT' = 16,
    'RELOADSETTINGS' = 17,
    'HIDEUSERS' = 18,
    'RULEVIOLATION' = 19,
    'SESSIONSTATE' = 20,
    'REQUESTPVT' = 21,
    'ACCEPTPVT' = 22,
    'REJECTPVT' = 23,
    'ENDSESSION' = 24,
    'TXPROFILE' = 25,
    'STARTVOYEUR' = 26,
    'SERVERREFRESH' = 27,
    'SETTING' = 28,
    'BWSTATS' = 29,
    'SETGUESTNAME' = 30,
    'SETTEXTOPT' = 31,
    'SERVERCONFIG' = 32,
    'MODELGROUP' = 33,
    'REQUESTGRP' = 34,
    'STATUSGRP' = 35,
    'GROUPCHAT' = 36,
    'CLOSEGRP' = 37,
    'UCR' = 38,
    'MYUCR' = 39,
    'SLAVECON' = 40,
    'SLAVECMD' = 41,
    'SLAVEFRIEND' = 42,
    'SLAVEVSHARE' = 43,
    'ROOMDATA' = 44,
    'NEWSITEM' = 45,
    'GUESTCOUNT' = 46,
    'PRELOGINQ' = 47,
    'MODELGROUPSZ' = 48,
    'ROOMHELPER' = 49,
    'CMESG' = 50,
    'JOINCHAN' = 51,
    'CREATECHAN' = 52,
    'INVITECHAN' = 53,
    'KICKCHAN' = 54,
    'QUIETCHAN' = 55,
    'BANCHAN' = 56,
    'PREVIEWCHAN' = 57,
    'SHUTDOWN' = 58,
    'LISTBANS' = 59,
    'UNBAN' = 60,
    'SETWELCOME' = 61,
    'PERMABAN' = 62,
    'CHANOP' = 62,
    'LISTCHAN' = 63,
    'TAGS' = 64,
    'SETPCODE' = 65,
    'SETMINTIP' = 66,
    'UEOPT' = 67,
    'HDVIDEO' = 68,
    'METRICS' = 69,
    'OFFERCAM' = 70,
    'REQUESTCAM' = 71,
    'MYWEBCAM' = 72,
    'MYCAMSTATE' = 73,
    'PMHISTORY' = 74,
    'CHATFLASH' = 75,
    'TRUEPVT' = 76,
    'BOOKMARKS' = 77,
    'EVENT' = 78,
    'STATEDUMP' = 79,
    'RECOMMEND' = 80,
    'EXTDATA' = 81,
    'ZGWINVALID' = 95,
    'CONNECTING' = 96,
    'CONNECTED' = 97,
    'DISCONNECTED' = 98,
    'LOGOUT' = 99,
}
declare enum FCUCR {
    'VM_LOUNGE' = 0,
    'CREATOR' = 0,
    'VM_MYWEBCAM' = 1,
    'FRIENDS' = 1,
    'MODELS' = 2,
    'PREMIUMS' = 4,
    'BASIC' = 8,
    'BASICS' = 8,
    'ALL' = 15,
}
declare enum FCUPDATE {
    'NONE' = 0,
    'MISSMFC' = 1,
    'NEWTIP' = 2,
}
declare enum FCVIDEO {
    'TX_IDLE' = 0,
    'TX_RESET' = 1,
    'TX_AWAY' = 2,
    'TX_CONFIRMING' = 11,
    'TX_PVT' = 12,
    'TX_GRP' = 13,
    'TX_RESERVED' = 14,
    'TX_KILLMODEL' = 15,
    'C2C_ON' = 20,
    'C2C_OFF' = 21,
    'RX_IDLE' = 90,
    'RX_PVT' = 91,
    'RX_VOY' = 92,
    'RX_GRP' = 93,
    'NULL' = 126,
    'UNKNOWN' = 127,
    'OFFLINE' = 127,
}
declare enum FCWINDOW {
    'NO_USER_PM' = 20,
    'OPTIONS_ADD_FRIEND' = 31,
    'OPTIONS_ADD_IGNORE' = 32,
}
declare enum FCWOPT {
    'NONE' = 0,
    'ADD' = 1,
    'REMOVE' = 2,
    'LIST' = 4,
    'NO_RECEIPT' = 128,
    'REDIS_JSON' = 256,
    'USERID' = 1024,
    'USERDATA' = 2048,
    'USERNAME' = 4096,
    'C_USERNAME' = 32768,
    'C_MONTHSLOGIN' = 65536,
    'C_LEVEL' = 131072,
    'C_VSTATE' = 262144,
    'C_CHATTEXT' = 524288,
    'C_PROFILE' = 1048576,
    'C_AVATAR' = 2097152,
    'C_RANK' = 4194304,
    'C_SDATE' = 8388608,
}
declare enum HIDE {
    'MODEL_GROUPS_AWAY' = 1,
    'MODEL_GROUPS_PRIVATE' = 2,
    'MODEL_GROUPS_GROUP' = 4,
    'MODEL_GROUPS_PUBLIC' = 8,
}
declare enum LOUNGE {
    'MASK_AUTO_CLICK' = 1,
    'MASK_NO_CAMSNAPS' = 2,
    'MASK_LOUNGE_MODE' = 4,
}
declare enum MODEL {
    'LIST_ICON_NEW_MODEL' = 1,
    'LIST_ICON_RECOMMEND' = 2,
    'LIST_ICON_POPULAR' = 4,
    'LIST_ICON_RECENT' = 8,
    'LIST_ICON_MISSMFC' = 16,
    'LIST_ICON_TRENDING' = 32,
}
declare enum MODELORDER {
    'NONE' = 0,
    'PVT' = 1,
    'TRUEPVT' = 2,
    'GRP' = 4,
}
declare enum MYFREECAMS {
    'NEWS_USER_ID' = 481462,
}
declare enum MYWEBCAM {
    'EVERYONE' = 0,
    'ONLYUSERS' = 1,
    'ONLYFRIENDS' = 2,
    'ONLYMODELS' = 3,
    'FRIENDSANDMODELS' = 4,
    'WHITELIST' = 5,
}
declare enum TKOPT {
    'NONE' = 0,
    'START' = 1,
    'STOP' = 2,
    'OPEN' = 4,
    'PVT' = 8,
    'VOY' = 16,
    'GRP' = 32,
    'TIP' = 256,
    'TIP_HIDDEN_AMT' = 512,
    'TIP_OFFLINE' = 1024,
    'TIP_MSG' = 2048,
    'TIP_ANON' = 4096,
    'TIP_PUBLIC' = 8192,
    'TIP_FROMROOM' = 16384,
    'TIP_PUBLICMSG' = 32768,
    'TIP_HISTORY' = 65536,
    'HDVIDEO' = 1048576,
}
declare enum USEREXT {
    'NUM' = 0,
    'STRING' = 1,
    'DATA' = 2,
    'STAMP' = 3,
}
declare enum WEBCAM {
    'SECURITY_EVERYONE' = 0,
    'SECURITY_FRIENDS' = 2,
    'SECURITY_MODELS' = 3,
    'SECURITY_MODELS_FRIENDS' = 4,
    'SECURITY_ALLOWED' = 5,
}
declare enum WINDOW {
    'MODE_DEFAULT' = 0,
    'MODE_DHTML' = 1,
    'MODE_DESKTOP_DHTML' = 1,
    'MODE_BROWSER' = 2,
    'MODE_MOBILE_DHTML' = 2,
}
declare class Model implements NodeJS.EventEmitter {
    uid: number;
    nm: string;
    tags: string[];
    private client;
    knownSessions: Map<number, ModelSessionDetails>;
    addListener: (event: string, listener: Function) => this;
    on: (event: string, listener: Function) => this;
    once: (event: string, listener: Function) => this;
    removeListener: (event: string, listener: Function) => this;
    removeAllListeners: (event?: string) => this;
    getMaxListeners: () => number;
    setMaxListeners: (n: number) => this;
    listeners: (event: string) => Function[];
    emit: (event: string, ...args: any[]) => boolean;
    listenerCount: (type: string) => number;
    private static EventsForAllModels;
    static addListener: (event: string, listener: Function) => NodeJS.EventEmitter;
    static on: (event: string, listener: Function) => NodeJS.EventEmitter;
    static once: (event: string, listener: Function) => NodeJS.EventEmitter;
    static removeListener: (event: string, listener: Function) => NodeJS.EventEmitter;
    static removeAllListeners: (event?: string) => NodeJS.EventEmitter;
    static getMaxListeners: () => number;
    static setMaxListeners: (n: number) => NodeJS.EventEmitter;
    static listeners: (event: string) => Function[];
    static emit: (event: string, ...args: any[]) => boolean;
    static listenerCount: (type: string) => number;
    private static knownModels;
    constructor(uid: number, packet?: Packet);
    static getModel(id: any, createIfNecessary?: boolean): Model;
    static findModels(filter: (model: Model) => boolean): Model[];
    bestSessionId: number;
    bestSession: ModelSessionDetails;
    mergePacket(packet: Packet): void;
    private purgeOldSessions();
    private static whenMap;
    static when(condition: whenFilter, onTrue: whenCallback, onFalseAfterTrue?: whenCallback): void;
    static removeWhen(condition: (m: Model) => boolean): boolean;
    private whenMap;
    when(condition: whenFilter, onTrue: whenCallback, onFalseAfterTrue?: whenCallback): void;
    removeWhen(condition: (m: Model) => boolean): boolean;
    private processWhens(packet);
    toString(): string;
}
declare type whenFilter = (m: Model) => boolean;
declare type whenCallback = (m: Model, p: Packet) => void;
interface whenMapEntry {
    onTrue: whenCallback;
    onFalseAfterTrue: whenCallback;
    matchedSet: Set<number>;
}
interface mergeCallbackPayload {
    prop: string;
    oldstate: number | string | string[] | boolean;
    newstate: number | string | string[] | boolean;
}
interface ModelSessionDetails extends BaseMessage, ModelDetailsMessage, UserDetailsMessage, SessionDetailsMessage {
    model_sw?: number;
    truepvt?: number;
    guests_muted?: number;
    basics_muted?: number;
    [index: string]: number | string | boolean;
}
declare class Packet {
    client: Client;
    FCType: FCTYPE;
    nFrom: number;
    nTo: number;
    nArg1: number;
    nArg2: number;
    sPayload: number;
    sMessage: AnyMessage;
    private _aboutModel;
    private _pMessage;
    private _chatString;
    constructor(client: Client, FCType: FCTYPE, nFrom: number, nTo: number, nArg1: number, nArg2: number, sPayload: number, sMessage: AnyMessage);
    aboutModel: Model;
    private _parseEmotes(msg);
    pMessage: string;
    chatString: string;
    toString(): string;
}
declare type AnyMessage = FCTypeLoginResponse | FCTypeSlaveVShareResponse | FCTypeTagsResponse | FCTokenIncResponse | RoomDataMessage | Message;
declare type FCTypeLoginResponse = string;
declare type FCTypeSlaveVShareResponse = number[];
interface FCTypeTagsResponse {
    [index: number]: string[];
}
interface FCTokenIncResponse {
    ch: number;
    flags: number;
    m: (number | string)[];
    sesstype: number;
    stamp: number;
    tokens: number;
    u: (number | string)[];
}
interface RoomDataMessage {
    countdown: boolean;
    model: number;
    sofar: number;
    src: string;
    topic: string;
    total: number;
}
interface BaseMessage {
    sid: number;
    uid: number;
    lv?: number;
    nm?: string;
    vs?: number;
    msg?: string;
}
interface Message extends BaseMessage {
    u?: UserDetailsMessage;
    m?: ModelDetailsMessage;
    s?: SessionDetailsMessage;
}
interface ModelDetailsMessage {
    camscore?: number;
    continent?: string;
    flags?: number;
    kbit?: number;
    lastnews?: number;
    mg?: number;
    missmfc?: number;
    new_model?: number;
    rank?: number;
    rc?: number;
    topic?: string;
    hidecs?: boolean;
}
interface UserDetailsMessage {
    age?: number;
    avatar?: number;
    blurb?: string;
    camserv?: number;
    chat_bg?: number;
    chat_color?: string;
    chat_font?: number;
    chat_opt?: number;
    city?: string;
    country?: string;
    creation?: number;
    ethnic?: string;
    occupation?: string;
    photos?: number;
    profile?: number;
}
interface SessionDetailsMessage {
    ga2?: string;
    gst?: string;
    ip?: string;
    rp?: number;
    tk?: number;
}
declare function log(msg: string, fileRoot?: string, consoleFormatter?: (msg: string) => string): void;
declare function applyMixins(derivedCtor: any, baseCtors: any[]): void;
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): Map<K, V>;
    size: number;
    values(): Array<V>;
    keys(): Array<K>;
    entries(): Array<Array<K | V>>;
}
declare var Map: {
    new <K, V>(): Map<K, V>;
    prototype: Map<any, any>;
};
interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    size: number;
    values(): Array<T>;
    keys(): Array<T>;
    entries(): Array<Array<T>>;
}
declare var Set: {
    new <T>(): Set<T>;
    prototype: Set<any>;
};
