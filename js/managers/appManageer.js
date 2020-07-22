/*class AppManager{
    constructor(){
        //Este se comunica uno con otros
        this.dataManager = new DataManager(this);
        this.uiManager = new UIManager(this);
        this.dataManager.start();
    }
    */

    //Aplicando un singleton, sirve para hacer referencia a un objeto y se pueda aplicar varias veces.En este caso en el appManager
    var AppManager = (function(){
        function AppManager() {
          this.dataManager = new DataManager(this);
          this.uiManager = new UIManager(this);
          this.dataManager.start();
          this.owner = null;
        }
        var instance;
        return {
          getInstance: function(){
            if (!instance) {
              instance = new AppManager();
            }
            return instance;
          }
        };
      })();
