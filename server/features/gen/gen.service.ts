import { Book } from "@/server/domain/book";
import path from "path";
import { promises as fs } from "fs";
import { injectable } from "inversify";
import "reflect-metadata";

export interface IGenService {
  genBooks(number: number): Promise<Book[]>;
  genAndSaveBooks(
    number: number,
    chunkSize: number,
    prefix: string
  ): Promise<void>;
}

const BOOK_COVERS = [
  "/covers/1.png",
  "/covers/2.png",
  "/covers/3.png",
  "/covers/4.png",
  "/covers/5.png",
  "/covers/6.png",
  "/covers/7.png",
  "/covers/8.png",
  "/covers/9.png",
  "/covers/10.png",
  "/covers/11.png",
  "/covers/12.png",
  "/covers/13.png",
  "/covers/14.png",
  "/covers/15.png",
  "/covers/16.png",
  "/covers/17.png",
  "/covers/18.png",
  "/covers/19.png",
  "/covers/20.png",
  "/covers/21.png",
  "/covers/22.png",
  "/covers/23.png",
  "/covers/24.png",
  "/covers/25.png",
  "/covers/26.png",
  "/covers/27.png",
  "/covers/28.png",
  "/covers/29.png",
  "/covers/30.png",
  "/covers/31.png",
  "/covers/32.png",
  "/covers/33.png",
  "/covers/34.png",
  "/covers/35.png",
  "/covers/36.png",
];

const BOOK_TITLES = [
  "Whispers in the Wind",
  "Echoes of Eternity",
  "Shadowed Paths",
  "The Last Ember",
  "Moonlit Sonata",
  "Secrets of the Forgotten",
  "Starlight Dreams",
  "Beyond the Horizon",
  "Silent Reverie",
  "The Hidden Grove",
  "Crimson Horizons",
  "Veil of Mysteries",
  "Twilight Chronicles",
  "Mystic River",
  "Broken Wings",
  "The Enchanted Realm",
  "Lost in Time",
  "Golden Horizons",
  "Frostbound",
  "The Silent Watcher",
  "Emberfall",
  "Lunar Eclipse",
  "The Forgotten Isle",
  "Radiant Shadows",
  "Celestial Voyage",
  "Whispering Pines",
  "Echoes of Silence",
  "The Sapphire Key",
  "Twilight Voyage",
  "Shadowcaster",
  "The Crystal Labyrinth",
  "Eternal Dawn",
  "Veins of Gold",
  "Mystic Echoes",
  "The Silver Lining",
  "Emberlight",
  "Forgotten Legends",
  "Starlit Journey",
  "The Hidden Fortress",
  "Whispers of the Past",
  "Celestial Harmony",
  "Shadowed Dreams",
  "The Last Sanctuary",
  "Moonshadow",
  "Echoes of the Heart",
  "Silent Shores",
  "The Golden Compass",
  "Twilight Veil",
  "Mystic Whispers",
  "Radiant Twilight",
  "The Forgotten Path",
  "Emberstorm",
  "Lunar Whispers",
  "Shadowed Serenity",
  "Echoes of Dawn",
  "Celestial Secrets",
  "Whispers of Twilight",
  "The Hidden Symphony",
  "Starlight Veil",
  "Silent Echoes",
  "The Crystal Horizon",
  "Eternal Whispers",
  "Veil of Shadows",
  "Mystic Dawn",
  "The Silver Veil",
  "Emberlight Sonata",
  "Forgotten Echoes",
  "Starlit Veins",
  "The Hidden Echo",
  "Whispers of Eternity",
  "Celestial Echoes",
  "Shadowed Harmony",
  "The Last Echo",
  "Moonlit Whispers",
  "Echoes of Serenity",
  "Silent Horizons",
  "The Golden Veil",
  "Twilight Echoes",
  "Mystic Shadows",
  "Radiant Echo",
  "The Forgotten Symphony",
  "Emberveil",
  "Lunar Harmony",
  "Shadowed Legends",
  "Echoes of Light",
  "Celestial Dreams",
  "Whispers of the Moon",
  "The Hidden Light",
  "Starlight Echo",
  "Silent Legends",
  "The Crystal Symphony",
  "Eternal Echoes",
  "Veil of Serenity",
];

const BOOK_AUTHORS = [
  "Liam Carter",
  "Emma Sullivan",
  "Noah Bennett",
  "Olivia Hayes",
  "William Foster",
  "Ava Mitchell",
  "James Brooks",
  "Isabella Reed",
  "Benjamin Hayes",
  "Mia Parker",
  "Lucas Turner",
  "Sophia Collins",
  "Henry Murphy",
  "Amelia Rivera",
  "Alexander Hughes",
  "Charlotte Simmons",
  "Daniel Russell",
  "Evelyn Foster",
  "Matthew Jenkins",
  "Abigail Powell",
  "Joseph Ward",
  "Emily Butler",
  "Samuel Price",
  "Harper Barnes",
  "David Kelly",
  "Ella Cooper",
  "Michael Richardson",
  "Grace Patterson",
  "Ethan Howard",
  "Chloe Long",
  "Logan Barnes",
  "Lily Russell",
  "Jackson Foster",
  "Sofia Hayes",
  "Sebastian Coleman",
  "Avery Coleman",
  "Aiden Brooks",
  "Scarlett Hayes",
  "Owen Powell",
  "Victoria Bryant",
  "Gabriel Murphy",
  "Hannah Simmons",
  "Carter Butler",
  "Addison Foster",
  "Julian Jenkins",
  "Zoe Carter",
  "Isaac Ward",
  "Nora Brooks",
  "Jayden Hughes",
  "Leah Russell",
  "Ryan Patterson",
  "Layla Long",
  "Nathan Price",
  "Camila Kelly",
  "Caleb Turner",
  "Aria Collins",
  "Christian Rivera",
  "Penelope Foster",
  "Hunter Murphy",
  "Riley Simmons",
  "Dylan Butler",
  "Ellie Foster",
  "Leo Jenkins",
  "Aubrey Hayes",
  "Isaiah Ward",
  "Savannah Brooks",
  "Charles Hughes",
  "Brooklyn Russell",
  "Thomas Patterson",
  "Paisley Long",
  "Josiah Price",
  "Skylar Kelly",
  "Joshua Turner",
  "Claire Collins",
  "Andrew Rivera",
  "Lucy Foster",
  "Lincoln Murphy",
  "Aaliyah Simmons",
  "Mateo Butler",
  "Anna Foster",
  "Ryan Jenkins",
  "Allison Hayes",
  "Jaxon Ward",
  "Bella Brooks",
  "Elias Hughes",
  "Nova Russell",
  "Aaron Patterson",
  "Stella Long",
  "Ezra Price",
  "Violet Kelly",
  "Grayson Turner",
  "Paisley Collins",
  "Maverick Rivera",
  "Paislee Foster",
  "Nicholas Murphy",
  "Skylar Simmons",
  "Josiah Butler",
  "Sadie Foster",
  "Angel Jenkins",
  "Naomi Hayes",
  "Jonathan Ward",
  "Genesis Brooks",
  "Colton Hughes",
  "Emilia Russell",
];

const PUBLISH_COMPANIES = [
  "Aurora Press",
  "Stellar Books",
  "Luminous Publishing",
  "EchoWave Publishing",
  "Nimbus Books",
  "SilverQuill Press",
  "Celestial Ink",
  "Verdant Valley Publishing",
  "Radiant Ridge Press",
  "GoldenLeaf Publishers",
  "Mystic Horizon Press",
  "Infinite Pages Publishing",
  "Twilight Grove Books",
  "EmberLight Publishing",
  "Crimson Sky Press",
  "Harmony House Publishers",
  "Serene Stream Press",
  "Opal Orchard Publishing",
  "Vibrant Verse Publishers",
  "Cascade Crest Press",
];

const BOOK_GENRES = [
  "Action",
  "Adventure",
  "Classic",
  "Coming of Age",
  "Contemporary",
  "Crime",
  "Detective",
  "Drama",
  "Fantasy",
  "High Fantasy",
  "Dark Fantasy",
  "Urban Fantasy",
  "Historical Fantasy",
  "Science Fiction",
  "Hard Science Fiction",
  "Soft Science Fiction",
  "Cyberpunk",
  "Steampunk",
  "Space Opera",
  "Time Travel",
  "Dystopian",
  "Post-Apocalyptic",
  "Apocalyptic",
  "Military Science Fiction",
  "Alternate History",
  "Horror",
  "Gothic Horror",
  "Supernatural Horror",
  "Psychological Horror",
  "Paranormal Horror",
  "Mystery",
  "Cozy Mystery",
  "Noir",
  "Thriller",
  "Psychological Thriller",
  "Legal Thriller",
  "Medical Thriller",
  "Spy Thriller",
  "Action Thriller",
  "Romantic Thriller",
  "Romance",
  "Contemporary Romance",
  "Historical Romance",
  "Paranormal Romance",
  "Fantasy Romance",
  "Romantic Suspense",
  "Erotic Romance",
  "Young Adult (YA)",
  "New Adult (NA)",
  "Middle Grade",
  "Children's",
  "Picture Book",
  "Fairy Tales",
  "Fables",
  "Folklore",
  "Biography",
  "Autobiography",
  "Memoir",
  "True Crime",
  "Self-Help",
  "Health & Wellness",
  "Business & Economics",
  "Finance",
  "Investing",
  "Management & Leadership",
  "Entrepreneurship",
  "Technology",
  "Computers & Internet",
  "Science",
  "Mathematics",
  "Philosophy",
  "Religion & Spirituality",
  "Politics",
  "History",
  "War",
  "Travel",
  "Nature",
  "Environment",
  "Sports",
  "Art",
  "Photography",
  "Music",
  "Performing Arts",
  "Crafts & Hobbies",
  "Humor",
  "Satire",
  "Essays",
  "Poetry",
  "Literary Fiction",
  "Experimental",
  "Short Stories",
  "Anthology",
  "Graphic Novels",
  "Manga",
  "Web Fiction",
  "Epistolary",
  "Bildungsroman",
  "Metafiction",
  "Magical Realism",
  "Bizarro Fiction",
];

@injectable()
export class GenService implements IGenService {
  async genAndSaveBooks(
    number: number,
    chunkSize: number,
    prefix: string
  ): Promise<void> {
    const books = await this.genBooks(number);

    for (let i = 0; i < books.length; i += chunkSize) {
      const chunk = books.slice(i, i + chunkSize);
      const chunkIndex = Math.floor(i / chunkSize);
      await this.saveBooks(chunk, prefix, chunkIndex);
    }
  }

  private async saveBooks(
    books: Book[],
    prefix: string,
    index: number
  ): Promise<void> {
    const dataDir = path.join(process.cwd(), "app", "data");
    const filePath = path.join(dataDir, `${prefix}-${index}.json`); // e.g. books-0.json
    const jsonData = JSON.stringify(books, null, 2);
    try {
      await fs.writeFile(filePath, jsonData, "utf-8");
    } catch (error) {
      console.error("Error saving books:", error);
    }
  }

  async genBooks(number: number): Promise<Book[]> {
    const books = [];
    for (let i = 0; i < number; i++) {
      books.push(this.genBook());
    }

    return books;
  }

  private genBook(): Book {
    return {
      id: Math.random().toString(36).substring(7),
      title: this.genTitle(),
      subtitle: this.genSubtitle(),
      description: this.genDescription(),
      genres: this.genGenres(),
      concepts: this.genConcepts(),
      authors: this.genAuthors(),
      publisher: this.genPublisher(),
      edition: this.genEdition(),
      publishDate: this.genPublishDate(),
      coverImg: this.genCoverImg(),
    };
  }

  private genTitle(): string {
    return BOOK_TITLES[Math.floor(Math.random() * BOOK_TITLES.length)];
  }

  private genSubtitle(): string {
    return Math.random() > 0.5
      ? BOOK_TITLES[Math.floor(Math.random() * BOOK_TITLES.length)]
      : "";
  }

  private genDescription(): string {
    return Math.random() > 0.5
      ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      : "";
  }

  private genGenres(): string[] {
    const genres = [];
    const numGenres = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numGenres; i++) {
      genres.push(BOOK_GENRES[Math.floor(Math.random() * BOOK_GENRES.length)]);
    }
    return genres;
  }

  private genConcepts(): string[] {
    const concepts = [];
    const numConcepts = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numConcepts; i++) {
      concepts.push(
        BOOK_GENRES[Math.floor(Math.random() * BOOK_GENRES.length)]
      );
    }
    return concepts;
  }

  private genAuthors(): string[] {
    const authors = [];
    const numAuthors = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numAuthors; i++) {
      authors.push(
        BOOK_AUTHORS[Math.floor(Math.random() * BOOK_AUTHORS.length)]
      );
    }
    return authors;
  }

  private genPublisher(): string {
    return PUBLISH_COMPANIES[
      Math.floor(Math.random() * PUBLISH_COMPANIES.length)
    ];
  }

  private genEdition(): string {
    return `Edition ${Math.floor(Math.random() * 10) + 1}`;
  }

  private genPublishDate(): string {
    const startRange = new Date(2000, 0, 1).getTime();
    const endRange = new Date().getTime();

    const randomDate = new Date(
      startRange + Math.random() * (endRange - startRange)
    );

    return randomDate.toISOString().split("T")[0];
  }

  private genCoverImg(): string[] {
    const coverImg = [];
    const numCovers = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numCovers; i++) {
      coverImg.push(
        BOOK_COVERS[Math.floor(Math.random() * BOOK_COVERS.length)]
      );
    }
    return coverImg;
  }
}
