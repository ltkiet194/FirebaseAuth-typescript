
class User {
      uid: string;
      name: string;
      email: string;

      constructor(id: string, name: string, email: string) {
            this.uid = id;
            this.name = name;
            this.email = email;
      }

      getInfo(): string {
            return `User ID: ${this.uid}, Name: ${this.name}, Email: ${this.email}`;
      }
}

