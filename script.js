document.addEventListener("DOMContentLoaded", init, create_cells);
function init(){
    /*this.body=document.querySelector("body");
    this.puzzle_Elements=document.createElement('div');
    this.puzzle_Elements.className='puzzle-wrapper';

    this.puzzle_Elements.style.width='400px';
    this.puzzle_Elements.style.height='400px';


    //Control panel with elements
    const control_elements=document.createElement('div');
    control_elements.className='control_elements';

    this.body.append(control_elements);
    this.body.append(this.puzzle_Elements);

    const control_buttons=document.createElement('div');
    control_buttons.className='control_buttons'
    control_elements.append(control_buttons);

    //Create buttons

    //Stop button
    const stop=document.createElement('button');
    stop.className='button';
    stop.innerHTML='Stop Time';

    control_buttons.append(stop);

    //Start button
    const start=document.createElement('button');
    start.className='button';
    start.innerHTML='Start Time';

    control_buttons.append(start);

    //New Game button (reset)
    const reset=document.createElement('button');
    reset.className='button';
    reset.innerHTML='New Game';

    control_buttons.append(reset);

    //Save Game
    const save=document.createElement('button');
    save.className='button';
    save.innerHTML='Save Game';

    control_buttons.append(save);

    //Game time
    const time=document.createElement('div');
    time.className='time';
    control_elements.append(time);
    time.innerHTML='Time';

    //Moves
    const moves=document.createElement('div');
    moves.className='moves';
    control_elements.append(moves);
    if (localStorage.getItem('moves')!==null){
        moves.innerHTML='Moves '+localStorage.getItem('moves');
    }else{
        moves.innerHTML='Moves';
    }

    //Choose size
    const choose_size=document.createElement('div');
    choose_size.className='choose_size';
    control_elements.append(choose_size);
    const three=document.createElement('button');
    three.className='size_button';
    three.innerHTML='3×3';
    const four=document.createElement('button');
    four.className='size_button';
    four.innerHTML='4×4';
    const eight=document.createElement('button');
    eight.className='size_button';
    eight.innerHTML='8×8';
    choose_size.append(three, four, eight);*/


    //Game field
    const cellSize=100;

    this.empty={
        value: 0,
        top: 0,
        left: 0
    };

    this.cells=[];
    this.cells.push(empty);

    let moves_counter=0;

}
const body=document.querySelector("body");
const puzzle_Elements=document.createElement('div');
puzzle_Elements.className='puzzle-wrapper';

puzzle_Elements.style.width='400px';
puzzle_Elements.style.height='400px';


//Control panel with elements
const control_elements=document.createElement('div');
control_elements.className='control_elements';

body.append(control_elements);
body.append(puzzle_Elements);

const control_buttons=document.createElement('div');
control_buttons.className='control_buttons'
control_elements.append(control_buttons);

//Create buttons

//Stop button
const stop=document.createElement('button');
stop.className='button';
stop.innerHTML='Stop Time';

control_buttons.append(stop);

//Start button
const start=document.createElement('button');
start.className='button';
start.innerHTML='Start Time';

control_buttons.append(start);

//New Game button (reset)
const reset=document.createElement('button');
reset.className='button';
reset.innerHTML='New Game';

control_buttons.append(reset);

//Save Game
const save=document.createElement('button');
save.className='button';
save.innerHTML='Save Game';

control_buttons.append(save);

//Game time
const time=document.createElement('div');
time.className='time';
control_elements.append(time);
time.innerHTML='Time';

//Moves
const moves=document.createElement('div');
moves.className='moves';
control_elements.append(moves);
if (localStorage.getItem('moves')!==null){
    moves.innerHTML='Moves '+localStorage.getItem('moves');
}else{
    moves.innerHTML='Moves';
}

//Choose size
const choose_size=document.createElement('div');
choose_size.className='choose_size';
control_elements.append(choose_size);
const three=document.createElement('button');
three.className='size_button';
three.innerHTML='3×3';
const four=document.createElement('button');
four.className='size_button';
four.innerHTML='4×4';
const eight=document.createElement('button');
eight.className='size_button';
eight.innerHTML='8×8';
choose_size.append(three, four, eight);


//Game field
const cellSize=100;

let empty={
    value: 0,
    top: 0,
    left: 0
};

let cells=[];
cells.push(empty);

let moves_counter=0;

function move(index, size=4){
    if (localStorage.getItem('moves')!==null){
        moves_counter=Number(localStorage.getItem('moves'));
    }
    const cell =cells[index];
    let leftDiff= Math.abs(empty.left-cell.left);
    let topDiff= Math.abs(empty.top-cell.top);
    const move_number=moves;

    if (leftDiff+topDiff >1){
        return;
    }
    cell.element.style.left=`${empty.left*cellSize}px`;
    cell.element.style.top=`${empty.top*cellSize}px`;

    const empty_left=empty.left;
    const empty_top=empty.top;
    empty.left=cell.left;
    empty.top=cell.top;
    cell.left=empty_left;
    cell.top=empty_top;

    let empty_array=[empty.top, empty.left];
    console.log(cells);
    localStorage.setItem('empty_cell', JSON.stringify(empty_array));
    save_coord(size);
    localStorage.setItem('field_size', size);

    moves_counter=moves_counter+1;
    move_number.innerHTML='Moves '+String(moves_counter);
    localStorage.setItem('moves', moves_counter);


    const isFinished = cells.every(cell =>{
        return cell.value === cell.top *4+cell.left;
    })

    if (isFinished){
        alert('Congratulations!!! You won!!!')
    }

}

function create_cells(size=4){
        cells=[];
        empty={
            value: 0,
            top: 0,
            left: 0
        };
        cells.push(empty);
        let value=Number, left=Number, top=Number;
        let number_cells=Math.pow(size, 2)-1;
        console.log(size, number_cells);
        const numbers=[...Array(number_cells).keys()]
            .sort(()=> Math.random()-0.5);
        if (localStorage.getItem('field_size')!==null){
            let field=Number(localStorage.getItem('field_size'));
            puzzle_Elements.style.width=`${field*100}px`;
            puzzle_Elements.style.height=`${field*100}px`;
        }
        if (localStorage.getItem('empty_cell')!==null){
            const arr_empty_cell=localStorage.getItem('empty_cell').split(',');
            empty.top=Number(arr_empty_cell[0].replace(/"/g,'').replace('[',''));
            empty.left=Number(arr_empty_cell[1].replace(/"/g,'').replace(']',''));
            cells=[];
            cells.push(empty);
        }

        for (let i=1; i<=number_cells; i++){
            if (localStorage.getItem('cells_obj')!==null) {
                const arr1 = localStorage.getItem('cells_obj').split('],[');
                const arr2 = [];
                for (let i = 0; i < arr1.length; i++) {
                    arr2.push(arr1[i].split(','));
                }
                value=Number(arr2[i-1][0].replace(/"/g,'').replace('[[',''));
                left=Math.trunc(Number(arr2[i-1][1].replace(/"/g,''))/100);
                top=Math.trunc(Number(arr2[i-1][2].replace(/"/g,'').replace(']]', ''))/100);
            }else{
                value=numbers[i-1]+1;
                left=i%size;
                top=(i-left)/size;
            }
            const cell=document.createElement('div');
            cell.className='cell';
            cell.innerHTML=value;


            cells.push({
                value:value,
                left: left,
                top: top,
                element: cell
            });

            cell.style.left=`${left*cellSize}px`;
            cell.style.top=`${top*cellSize}px`;

            puzzle_Elements.append(cell);

            cell.addEventListener('click', () => {
                move(i, size);});
        };
}

//Events on buttons

let interval=0,
    currentTimer=0,
    lastUpdateTime=new Date().getTime();

start.addEventListener('click', start_game);
stop.addEventListener('click', finish_game);
reset.addEventListener('click', new_game);
save.addEventListener('click', save_game);
three.addEventListener('click', ()=>{
                                                    puzzle_Elements.style.width='300px';
                                                    puzzle_Elements.style.height='300px';
                                                    clear();
                                                    create_cells(3);});
four.addEventListener('click', ()=>{puzzle_Elements.style.width='400px';
                                                    puzzle_Elements.style.height='400px';
                                                    clear();
                                                    create_cells();});
eight.addEventListener('click', ()=>{puzzle_Elements.style.width='800px';
                                                    puzzle_Elements.style.height='800px';
                                                    clear();
                                                    create_cells(8);});

function update_time(){
    let now =new Date().getTime(),
        dt=now-lastUpdateTime;

    currentTimer +=dt;
    let time_counter =new Date(currentTimer);

    time.innerHTML= `Time ${addZero(time_counter.getMinutes())} : ${addZero(time_counter.getSeconds())}`;
    lastUpdateTime=now;
};

function addZero(n){
    return (parseInt(n, 10)< 10 ? '0': '') +n;
}

function start_game(){
    if (!interval){
        lastUpdateTime =new Date().getTime();
        interval=setInterval(update_time, 1000);
    }

}

function finish_game(){
    clearInterval(interval);
    interval=0;
    localStorage.setItem('time', time.innerHTML);
}
function clear(){
    localStorage.clear();
    moves_counter=0;
    let removed_els=document.getElementsByClassName('cell');
    let len=removed_els.length;
    for (let i=0; i<len; i++){
        removed_els[0].remove();
    }
}

function new_game(){
    localStorage.clear();
    moves_counter=0;
    finish_game();
    currentTimer=0;
    time.innerHTML= `Time ${addZero(currentTimer)} : ${addZero(currentTimer)}`;
    let removed_els=document.getElementsByClassName('cell');
    for (let i=0; i<15; i++){
        removed_els[0].remove();
    }
    empty.top=0;
    empty.left=0;
    cells=[];
    cells.push(empty);
    create_cells()
}

function save_game(){
    localStorage.setItem('time', time.innerHTML);
    localStorage.setItem('moves', moves_counter);
    save_coord();
}

function save_coord(size=4){
    let all_cells=[];
    for (let i=0; i<Math.pow(size, 2)-1 ; i++){
        let cell_top=document.getElementsByClassName('cell')[i].offsetTop;
        let cell_left=document.getElementsByClassName('cell')[i].offsetLeft;
        let cell_number=document.getElementsByClassName('cell')[i].innerHTML;
        let cells_obj=[cell_number, cell_left, cell_top];
        all_cells.push(cells_obj);
    }
    localStorage.setItem('cells_obj', JSON.stringify(all_cells));
}

create_cells();
