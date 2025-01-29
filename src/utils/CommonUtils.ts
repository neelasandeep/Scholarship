import { uniqueNamesGenerator, names } from 'unique-names-generator';
export class CommonUtils{

    static getRandomName(){
        const randomName = uniqueNamesGenerator({
            dictionaries: [names, names], // First name + Last name
            separator: ' ', // Space between names
            style: 'capital' // Capitalize names properly
          });
        return randomName;
    }
    static generateRandomEmail(): string {
        const timestamp = Date.now();
        return `user${timestamp}@example.com`;
      }
    
    static generateRandomPhoneNumber(): string {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a 10-digit number
        return `+1${randomNumber}`; // Assuming US format with country code
      }
    static generateRandomText(length: number): string {
        return Array.from({ length }, () => 
          Math.random() < 0.5 ? 
          String.fromCharCode(Math.floor(Math.random() * 26) + 97) : // Random lowercase letter
          String.fromCharCode(Math.floor(Math.random() * 26) + 65)   // Random uppercase letter
        ).join('');
      }
    
    static generateRandomNumber(): number {
        return Math.floor(Math.random() * 10000);  // Random number between 0 and 9999
      }

    static  generatePassword(): string {
      const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const specialChars = "@#$%^&*";
      const digits = "0123456789";
      const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  
      function getRandomChar(charset: string): string {
          return charset[Math.floor(Math.random() * charset.length)];
      }
  
      let password = "";
      password += getRandomChar(upperCase);      // First character: Uppercase letter
      password += getRandomChar(specialChars);   // Second character: Special character
      for (let i = 0; i < 4; i++) {
          password += getRandomChar(digits);     // Next 4 characters: Digits
      }
      for (let i = 0; i < 4; i++) {
          password += getRandomChar(lowerCase);  // Last 4 characters: Lowercase letters
      }
  
      return password;
  }
  
        
}


