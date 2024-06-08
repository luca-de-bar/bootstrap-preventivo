## Refactoring

### Analisi

Nella versione precedente del codice erano presenti alcune ripetizioni e disorganizzazione, di seguito ciò che è stato ottimizzato:

- Gli elementi da validare ed i rispettivi feedback in base alla casistica (se Numerico o Vuoto ecc..) sono ora raggruppati in oggetti. È stato creato l'oggetto inputs che contiene tanti oggetti quanti gli input da validare presenti nel codice. Gli oggetti relativi agli elementi, contengono i feedback.

- Create delle funzioni generiche riutilizzabili come isEmpty e isNumeric, prima era presente una funzione per ogni input. Introdotta anche la funzione resetState che, appunto, resetta lo stato del form rimuovendo le classi is-valid e is-invalid ad ogni interazione.

Il resto del codice bene o male rimane invariato, le modifiche principali sono state la ri-organizzazione in oggetti degli elementi ed i rispettivi feedback ed il rifacimento delle funzioni, introducendo delle funzioni generiche che potessero essere riutilizzate.
