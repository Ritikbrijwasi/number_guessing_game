#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main()
{
    srand(time(0));             
    int randomNumber = rand() % 100 + 1;   

    int guess;
    int attempts = 0;

    cout << "=====================================\n";
    cout << "      NUMBER GUESSING GAME\n";
    cout << "=====================================\n";
    cout << "I have selected a number between 1 and 100.\n";
    cout << "Try to guess it!\n\n";

    do
    {
        cout << "Enter your guess: ";
        cin >> guess;

        attempts++;

        if (guess > randomNumber)
        {
            cout << "Too High! Try Again.\n\n";
        }
        else if (guess < randomNumber)
        {
            cout << "Too Low! Try Again.\n\n";
        }
        else
        {
            cout << "\nCongratulations! You guessed the correct number.\n";
            cout << "Number = " << randomNumber << endl;
            cout << "Attempts = " << attempts << endl;
        }

    } while (guess != randomNumber);

    return 0;
}