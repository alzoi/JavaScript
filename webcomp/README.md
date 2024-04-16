# webcomponents

## Ссылки

https://webcomponents.guide/learn/  
https://www.webcomponents.org/  

## Обработка событий
Можно использовать функцию handleEvent() для перехвата любых событий переданного объекта
```JavaScript
class Something {
  name = "Something Good";
  constructor(element) {
    // Note that the listeners in this case are `this`, not this.handleEvent
    element.addEventListener("click", this, false);
    element.addEventListener("dblclick", this, false);
  }
  handleEvent(event) {
    console.log(this.name); // 'Something Good', as this is bound to newly created object
    switch (event.type) {
      case "click":
        // some code here…
        break;
      case "dblclick":
        // some code here…
        break;
    }
  }
}

const s = new Something(document.body);
```
