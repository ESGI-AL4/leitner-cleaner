**Leitner Cleaner**

Pour récupérer le code:
```
git clone https://github.com/ESGI-AL4/leitner-cleaner
cd leitner-cleaner
```

Pour lancer le back:
```
cd backend/leitner-cleaner
npm install
npm run build
npm run start
```

Pour lancer les tests dans le back:
```
cd backend/leitner-cleaner
npm install
npm run test
```

Pour lancer la couverture de tests dans le back:
```
cd backend/leitner-cleaner
npm install
npm run test:cov
```
Pour modifier l'url de l'api dans le front:
```
Changer l'url dans le fichier .env
```

Pour lancer le front:
```
cd frontend/leitner-cleaner
npm install
npm run dev
```

Pour lancer les tests dans le front:
```
cd frontend/leitner-cleaner
npm install
npm run test
```

Pour lancer la couverture de tests dans le front:
```
cd frontend/leitner-cleaner
npm install
npm run coverage
```

Pour lancer les test end2end (front and back must be up)
```
cd frontend/playwright
pip install pytest-playwright
playwright install
pytest
```
