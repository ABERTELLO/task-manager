// Dependencies
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Common
import { NewNoteInterface } from 'src/common/interfaces';
import { addDays, numDate } from 'src/common/helpers';
import { Note } from 'src/notes/entities';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>,
  ) { }

  async runSeed() {
    const maxIndex: number = 11; // quantity of notes to generate
    const deltaIndex: number = 4; // quantity of last notes that are 'completed: false'
    const generatedNotes: NewNoteInterface[] = [];
    const referenceParam: number = maxIndex - deltaIndex; // from here, 'completed: true' notes will be generated
    
    for (let index: number = 1; index < maxIndex; index++) {
      const dateParam: number = referenceParam - index;
      const registrationDateParam: number = maxIndex - index;
      const stringDate: string = numDate(addDays(new Date(), - dateParam)).toString();
      const stringRegistrationDate: string = numDate(addDays(new Date(), - registrationDateParam)).toString();
      
      const generatedNote: NewNoteInterface = {
        author: 'Author',
        completed: index < referenceParam ? true : false,
        content: `This is the content of note ${index}`,
        date: stringDate,
        registrationDate: stringRegistrationDate,
        status: index < referenceParam ? 'lapsed' : 'regular',
        title: `Title ${index}`,
      };

      generatedNotes.push(generatedNote);
    };
    await this.noteModel.insertMany(generatedNotes)
    return 'Data is ready.';
  }

  async restartData() {
    await this.noteModel.deleteMany();

    this.runSeed();
    return 'Data was reset.';
  }
}
