Pour faire fonctionner le driver sur Debian:

source setup.sh
make

Voila le driver est pret a recevoir des commandes depuis le flux de passage RPmsg !

Pour lancer des programmes de tests:

On peut utiliser Python:

sudo python examples/neo-rainbow.py

Ou pour une version en C:

Compiler les examples:
cd examples
gcc -o neo_blink_open neo_blink_open.c
gcc -o neo_rainbow_open neo_rainbow_open.c -lm

cd examples
sudo ./neo_blink_open 

ou 

sudo ./neo_rainbow_open


Attention cependant, fopen ne marche pas étrangement... Certainement parce qu'il est bufferisé.


