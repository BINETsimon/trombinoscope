/* 
Page d'acceuil 
- Description de l'application 🚧

- LeaderBoard des profs ❓
*/

function Home() {

  return (
    <div className="main-container">
      <h1>Bienvenue sur Trainbinoscope</h1>
      <div className="display-container">
        <div className="inside-container">
          <p>Cette application a pour but de vous entrainer à mieux connaître les noms de vos élèves, employés ou autre...</p>
          <p>Voici quelques indications pour prendre en main l'application : </p>
          <ul> 
            <li>Créez votre compte.</li>
            <li>Préparez une liste d'image avec le format suivant : <code>Nom_Prénom_label.extension</code> (par exemple: <code>Jean-claude_Dupont_1999.png</code>).</li>
            <li>Ajoutez au moins 5 images pour pouvoir commencer à jouer.</li>
            <li>Lancez votre première partie.</li>
          </ul>
          <p>L'application va évoluer avec le temps. N'hésitez pas à vous reconnecter afin de découvrir les nouveaux modes de jeu et Nouvelles fonctionnalités.</p>
        </div>
      </div>
    </div>
  );
}
  
export default Home;