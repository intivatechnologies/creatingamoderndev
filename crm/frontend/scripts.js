class Anim {
    constructor(element){
        this.element = element;
        this.constClass = element.className;
        this.toggled = false;
        
        if (!element.className.includes("-anim"))
            console.error("Error: Element does not contain '-anim' in className. Current className:", element.className);
        if (!/-anim(\s|$)/.test(element.className))
            console.error("Error: Element has invalid text after '-anim'. Current className:", element.className);

        const animMatch = element.className.match(/\S*-anim/);
        this.prefabAnim = animMatch ? animMatch[0] : null;

        const startOfAnimMatch = element.className.indexOf(this.prefabAnim),
                endOfAnimMatch = startOfAnimMatch + this.prefabAnim.length;
        this.alts = {
            left: element.className.substring(0, startOfAnimMatch),
            right: element.className.substring(endOfAnimMatch)
        };
    }

    toggle(){
        this.toggled = !this.toggled;
        const newClassName = this.alts.left
            + (this.toggled ? this.prefabAnim + "-active" : this.prefabAnim)
            + this.alts.right;
        this.element.className = newClassName;
    }
}

function loadAnimTeam(domElements){
    let des = [];
    const elements = Array.from(domElements);

    for(let de of elements){
        const anim = new Anim(de);
        anim.toggle();
        des.push(anim);
    }

    return des;
}

//
window.onload = () => {
    setTimeout(() => {
        var basicAnims = loadAnimTeam(document.getElementsByClassName("basic-anim"));
    }, 125);
};
