export interface Server {
      id: string;
      name?: string;
      image?: string;
      owner?: string;
      membersSummary: Member[];
      members: string[];
      channels: Channel[];
}
export interface Member {
      id?: string;
      role: string;
}
export interface Channel {
      name: string;

}
