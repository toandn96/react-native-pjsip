declare module '@aldiand/react-native-pjsip' {
  import { EventEmitter } from 'events';

  export class AccountRegistration {
    private _status: string | null;
    private _statusText: string | null;
    private _active: boolean;
    private _reason: string | null;
  
    constructor({ status, statusText, active, reason }: {
      status: string | null,
      statusText: string | null,
      active: boolean,
      reason: string | null
    });
  
    getStatus(): string | null;
    getStatusText(): string | null;
    isActive(): boolean;
    getReason(): string | null;
    toJson(): { status: string | null, statusText: string | null, active: boolean, reason: string | null };
  }

  export class Account {
    private _data: {
      id: number;
      uri: string;
      name: string;
      username: string;
      domain: number | null;
      password: string;
      proxy: string;
      transport: string;
      contactParams: string;
      contactUriParams: string;
      regServer: string;
      regTimeout: string;
      regContactParams: string;
      regHeaders: object;
      registration: object;
    };
    private _registration: AccountRegistration;
  
    constructor(data: {
      id: number;
      uri: string;
      name: string;
      username: string;
      domain: number | null;
      password: string;
      proxy: string;
      transport: string;
      contactParams: string;
      contactUriParams: string;
      regServer: string;
      regTimeout: string;
      regContactParams: string;
      regHeaders: object;
      registration: object;
    });
  
    getId(): number;
    getURI(): string;
    getName(): string;
    getUsername(): string;
    getDomain(): number | null;
    getPassword(): string;
    getProxy(): string;
    getTransport(): string;
    getContactParams(): string;
    getContactUriParams(): string;
    getRegServer(): string;
    getRegTimeout(): string;
    getRegContactParams(): string;
    getRegHeaders(): object;
    getRegistration(): AccountRegistration;
  }

  export class Message {
    private _accountId: number;
    private _contactUri: string;
    private _fromUri: string;
    private _fromName: string | null;
    private _fromNumber: string | null;
    private _toUri: string;
    private _body: string | null;
    private _contentType: string;
  
    constructor({
      accountId,
      contactUri,
      fromUri,
      toUri,
      body,
      contentType
    }: {
      accountId: number;
      contactUri: string;
      fromUri: string;
      toUri: string;
      body: string | null;
      contentType: string;
    });
  
    getAccountId(): number;
    getContactUri(): string;
    getFromUri(): string;
    getFromName(): string | null;
    getFromNumber(): string | null;
    getToUri(): string;
    getBody(): string | null;
    getContentType(): string;
  }

  export class Call {
    constructor({
      id,
      callId,
      accountId,
      localContact,
      localUri,
      remoteContact,
      remoteUri,
      state,
      stateText,
      held,
      muted,
      speaker,
      connectDuration,
      totalDuration,
      remoteOfferer,
      remoteAudioCount,
      remoteVideoCount,
      audioCount,
      videoCount,
      lastStatusCode,
      lastReason,
      media,
      provisionalMedia,
    }: {
      id: any;
      callId: any;
      accountId: any;
      localContact: any;
      localUri: any;
      remoteContact: any;
      remoteUri: any;
      state: any;
      stateText: any;
      held: any;
      muted: any;
      speaker: any;
      connectDuration: any;
      totalDuration: any;
      remoteOfferer: any;
      remoteAudioCount: any;
      remoteVideoCount: any;
      audioCount: any;
      videoCount: any;
      lastStatusCode: any;
      lastReason: any;
      media: any;
      provisionalMedia: any;
    });

    getId(): number;
    getAccountId(): number;
    getCallId(): string;
    getTotalDuration(): number;
    getConnectDuration(): number;
    getFormattedTotalDuration(): string;
    getFormattedConnectDuration(): string;
    getLocalContact(): string;
    getLocalUri(): string;
    getRemoteContact(): string;
    getRemoteUri(): string;
    getRemoteName(): string;
    getRemoteNumber(): string;
    getRemoteFormattedNumber(): string;
    getState(): string;
    getStateText(): string;
    isHeld(): boolean;
    isMuted(): boolean;
    isSpeaker(): boolean;
    isTerminated(): boolean;
    getRemoteOfferer(): boolean;
    getRemoteAudioCount(): number;
    getRemoteVideoCount(): number;
    getAudioCount(): number;
    getVideoCount(): any;
    getLastStatusCode(): string;
    getLastReason(): string;
    getMedia(): any;
    getProvisionalMedia(): any;
    _formatTime(seconds: number): string;
  }

  declare interface PjSipHdrList {
    [headerName: string]: string;
  }
  
  declare interface PjSipMsgData {
    target_uri: string;
    hdr_list: PjSipHdrList;
    content_type: string;
    msg_body: string;
  }
  
  declare interface PjSipCallSettings {
    flag: number;
    req_keyframe_method: number;
    aud_cnt: number;
    vid_cnt: number;
  }
  
  declare interface EndpointEvents {
    pjSipRegistrationChanged: () => void;
    pjSipCallReceived: (data: any) => void;
    pjSipCallChanged: (data: any) => void;
    pjSipCallTerminated: (data: any) => void;
    pjSipCallScreenLocked: (data: any) => void;
    pjSipMessageReceived: (data: any) => void;
    pjSipConnectivityChanged: (data: any) => void;
  }

  export class Endpoint extends EventEmitter {
    constructor();
  
    start(configuration?: any): Promise<{
      accounts: Account[];
      calls: Call[];
      [key: string]: any;
    }>;
    updateStunServers(accountId: number, stunServerList: string[]): Promise<any>;
    changeNetworkConfiguration(configuration: any): Promise<any>;
    changeServiceConfiguration(configuration: any): Promise<any>;
    createAccount(configuration: any): Promise<Account>;
    replaceAccount(account: Account, configuration: any): void;  
    registerAccount(account: Account, renew?: boolean): Promise<any>;
    deleteAccount(account: Account): Promise<any>;
    makeCall(
      account: Account,
      destination: string,
      callSettings: PjSipCallSettings,
      msgData: PjSipMsgData
    ): Promise<Call>;
    answerCall(call: Call): Promise<any>;
    hangupCall(call: Call): Promise<any>;
    declineCall(call: Call): Promise<any>;
    holdCall(call: Call): Promise<any>;
    unholdCall(call: Call): Promise<any>;
    muteCall(call: Call): Promise<any>;
    unMuteCall(call: Call): Promise<any>;
    useSpeaker(call: Call): Promise<any>;
    useEarpiece(call: Call): Promise<any>;
    startConferenceCall(): Promise<any>;
    splitCall(call: Call): Promise<any>;
    splitConferenceCall(): Promise<any>;
    xferCall(account: Account, call: Call, destination: string): Promise<any>;
    xferReplacesCall(call: Call, destCall: Call): Promise<any>;
    redirectCall(account: Account, call: Call, destination: string): Promise<any>;
    dtmfCall(call: Call, digits: string): Promise<any>;
    on<U extends keyof EndpointEvents>(
      event: U,
      listener: EndpointEvents[U]
    ): this;
    once<U extends keyof EndpointEvents>(
      event: U,
      listener: EndpointEvents[U]
    ): this;
    off<U extends keyof EndpointEvents>(
      event: U,
      listener: EndpointEvents[U]
    ): this;
    activateAudioSession(): Promise<any>;
    deactivateAudioSession(): Promise<any>;
  }
}  