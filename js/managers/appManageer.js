class AppManager{
    constructor(){
        //Este se comunica uno con otros
        this.dataManager = new DataManager(this);
        this.uiManager = new UIManager(this);
        this.dataManager.start();
    }
}