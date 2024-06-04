## Refactoring

## Obbiettivi : 

- Eliminare le svariate funzioni di validazione create per ogni singolo input
- Rendere manuntenibile il codice
- Organizzare il codice
- Pulirlo da ripetizioni, ottimizzarlo.

## Azioni da eseguire
- Creare un array di oggetti che contenga per ogni form, le regole di validazione ad esempio per i form Name, Surname , Email, Textarea e Promocode la validazione comune è : 

- Se non è vuoto. Va per cui creata una funzione generica per checckare se il form è vuoto e applicarla ai vari form, poi nella funzione in base alle regole stabilite nell'oggetto contenente le regole di validazione, faccio apparire il messaggio nel DOM prendendo dall'oggetto il feedback corrispondente al form per la casistica specificata.

- Per Name e Surname la regola in comune è se contiene numero. Pertanto va creata una funzione che controlli se l'input value è numerico.

- Per Email, devo invece applicare la funzione regex per verificare la mail, poi posso senza creare un ulteriore funzione per la validazione, restituire un valore booleano se la mail rispetta la Regex.

## Quesito

- Devo poi checckare se tutti i form sono validi prima di restituire un messaggio positivo. Come applico questa cosa??