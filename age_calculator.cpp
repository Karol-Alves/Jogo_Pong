#include <stdio.h>
int amountDays, years, months, days;

int main (){

printf("Age in days\n");
scanf("%d" ,&amountDays);

//math operations
years=amountDays/365;
amountDays = amountDays % 365;
months = amountDays / 30;
amountDays = amountDays % 30;
days= amountDays;

printf("\n %d year(s)\n \n %d month(s)\n \n %d day(s)\n" , years, months, days);
return 0;
}
