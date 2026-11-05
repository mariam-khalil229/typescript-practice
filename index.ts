// 1. Base Class - User
class User {
  protected id: number; // Protected to allow access in subclasses
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age: number = 18;

  // 5. Aggregation - User and Notebook (User can own multiple notebooks)
  public notebooks: NoteBook[] = [];

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age; 
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    if (value >= 18 && value <= 60) {
      this._age = value;
    } else {
      throw new Error("Age must be between 18 and 60.");
    }
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public displayInfo(): void {
    console.log(`ID: ${this.id} | Name: ${this.name} | Email: ${this.email} | Age: ${this.age}`);
  }
}

// 2. Inheritance - Admin User
class Admin extends User {
  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    super(id, name, email, password, phone, age);
  }

  // Method specific to Admin to manage notes
  public manageNotes(): void {
    console.log(`Admin ${this.name} is currently managing the system notes.`);
  }
}

// 3. Class - Note & 6. Association - Note and User
class Note {
  public id: number;
  public title: string; 
  public content: string;
  
  // 6. Association: Each note must have an author (reference to User)
  public author: User; 

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  public preview(): string {
    return this.content.substring(0, 20) + "...";
  }
}

// 4. Composition - NoteBook and Notes
class NoteBook {
  private notes: Note[] = [];

  public addNote(id: number, title: string, content: string, author: User): void {
    const newNote = new Note(id, title, content, author);
    this.notes.push(newNote);
  }

  public removeNote(noteId: number): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
  }

  public getNotes(): Note[] {
    return this.notes;
  }
}

// 7. Generics - Data Storage
class DataStorage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  public getAllItems(): T[] {
    return this.items;
  }
}