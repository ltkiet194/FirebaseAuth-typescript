import firestore from '@react-native-firebase/firestore';

class Member {
      id?: string;
      role: string;
      constructor(id: string, role: string) {
            this.id = id;
            this.role = role;
      }
}

class Channel {
      name: string;
      uid: string;
      constructor(name: string, uid: string) {
            this.name = name;
            this.uid = uid;
      }
}


class Server {
      id?: string;
      name?: string;
      image?: string;
      owner?: string;
      members: Map<string, Member>;
      channels: Map<string, Channel>;

      constructor(
            id?: string,
            name?: string,
            image?: string,
            owner?: string,
            members: Map<string, Member> = new Map(),
            channels: Map<string, Channel> = new Map()
      ) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.owner = owner;
            this.members = members;
            this.channels = channels;
      }
      static async fetchServerById(serverId: string): Promise<Server> {
            const serverDoc = await firestore().collection('servers').doc(serverId).get();
            if (serverDoc.exists) {
                  const data = serverDoc.data();
                  const members = new Map<string, Member>();
                  const channels = new Map<string, Channel>();

                  const membersSnapshot = await firestore().collection(`servers/${serverId}/members`).get();
                  membersSnapshot.forEach((doc: any) => {
                        const memberData = doc.data();
                        members.set(doc.id, new Member(doc.id, memberData.role));
                  });
                  const channelsSnapshot = await firestore().collection(`servers/${serverId}/channels`).get();
                  channelsSnapshot.forEach((doc: any) => {
                        const channelData = doc.data();
                        channels.set(doc.id, new Channel(channelData.name, doc.id));
                  });
                  return new Server(serverDoc.id, data?.name, data?.image, data?.owner, members, channels);
            } else {
                  throw new Error('Server not found');
            }
      }

      async fetchMembers(): Promise<void> {
            if (!this.id) {
                  throw new Error('Server ID is not defined');
            }

            const membersSnapshot = await firestore().collection(`servers/${this.id}/members`).get();
            this.members.clear();
            membersSnapshot.forEach((doc: any) => {
                  const memberData = doc.data();
                  this.members.set(doc.id, new Member(doc.id, memberData.role));
            });
      }
      async fetchChannels(): Promise<void> {
            if (!this.id) {
                  throw new Error('Server ID is not defined');
            }

            const channelsSnapshot = await firestore().collection(`servers/${this.id}/channels`).get();
            this.channels.clear();
            channelsSnapshot.forEach((doc: any) => {
                  const channelData = doc.data();
                  this.channels.set(doc.id, new Channel(channelData.name, doc.id));
            });
      }
}

class MainApp {
      mapServers: Map<string, Server>;
      constructor() {
            this.mapServers = new Map();
      }
}

export { Server, Member, Channel, MainApp };
