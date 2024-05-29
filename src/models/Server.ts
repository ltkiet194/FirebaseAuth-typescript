export interface Server {
      id?: string;
      name?: string;
      image?: string;
      owner?: string;
      members: Member[];
      channels: Channel[];
}
export interface Member {
      id?: string;
      role: string;
}
export interface Channel {
      name: string;
      uid: string;
}



