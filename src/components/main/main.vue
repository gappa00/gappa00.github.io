<template>
  <div class="todo-app">
    <div class="chelik-input">
        <div>
            ФИО челика: <input v-model="name">
        </div>
        <div>
            Возраст челика: <input v-model="age">
        </div>
    </div>
    <button v-on:click="addNew">Добавить</button>
    <button v-on:click="clearInput">Очисить ввод</button>
    <div v-if="showFromLocal" class="chelik-table">

        <!-- <table class="chelik-info">
            <tr class="chelik-info-tr-main">
                <td colspan="6">Запомнено</td>
            </tr>
            <tr class="chelik-info-tr">
                <td>Номер:</td>
                <td>Фамилия:</td>
                <td>Имя:</td>
                <td>Отчество:</td>
                <td>Возраст:</td>
                <td ></td>
            </tr>
            <draggable v-model="peoples" group="people" @start="drag=true" @end="drag=false">
                <tr v-for="(chelik,index) in peoples" :key="chelik.nameFirst" class="chelik-info-tr">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="chelik.nameFirst">{{ chelik.nameFirst }}</span></td>
                    <td><span v-if="chelik.nameSecond">{{ chelik.nameSecond }}</span></td>
                    <td><span v-if="chelik.nameLast">{{ chelik.nameLast }}</span></td>
                    <td><span v-if="chelik.savedAge">{{ chelik.savedAge }}</span></td>
                    <td><button v-on:click="deleteChelik(index)">X</button></td>
                </tr>
            </draggable>
        </table> -->

        <div class="chelik-info">
            <div class="chelik-info-tr-main">
                <div colspan="6">Запомнено</div>
            </div>
            <div class="chelik-info-tr">
                <div>Номер:</div>
                <div>Фамилия:</div>
                <div>Имя:</div>
                <div>Отчество:</div>
                <div>Возраст:</div>
                <div></div>
            </div>
            <draggable v-model="peoples" group="people" @start="drag=true" @end="drag=false">
                <div v-for="(chelik,index) in peoples" :key="chelik.nameFirst" class="chelik-info-tr">
                    <div>{{ index + 1 }}</div>
                    <div><span v-if="chelik.nameFirst">{{ chelik.nameFirst }}</span></div>
                    <div><span v-if="chelik.nameSecond">{{ chelik.nameSecond }}</span></div>
                    <div><span v-if="chelik.nameLast">{{ chelik.nameLast }}</span></div>
                    <div><span v-if="chelik.savedAge">{{ chelik.savedAge }}</span></div>
                    <div><button v-on:click="deleteChelik(index)">X</button></div>
                </div>
            </draggable>
        </div>

        <!-- <div class="chelik-info">
            <div class="chelik-info-tr-main">
                Запомнено
            </div>
            <div class="chelik-info-line">
                <div>Номер:</div>
                <div>Фамилия:</div>
                <div>Имя:</div>
                <div>Отчество:</div>
                <div>Возраст:</div>
                <div></div>
            </div>
            <div v-for="(chelik,index) in peoples" :key="chelik.nameFirst" class="chelik-info-line">
                <div>{{ index + 1 }}</div>
                <div><span v-if="chelik.nameFirst">{{ chelik.nameFirst }}</span></div>
                <div><span v-if="chelik.nameSecond">{{ chelik.nameSecond }}</span></div>
                <div><span v-if="chelik.nameLast">{{ chelik.nameLast }}</span></div>
                <div><span v-if="chelik.savedAge">{{ chelik.savedAge }}</span></div>
                <div><button v-on:click="deleteChelik(index)">X</button></div>
            </div>
        </div> -->
        <button v-on:click="clear">Очистить</button>
    </div>
  </div>
</template>

<style lang="scss" src="./main.scss"></style>

<script>
    import TodoList from '../todo-list/list.vue'
    import TodoInput from '../todo-input/input.vue'
    import draggable from 'vuedraggable'

    export default {
        name: 'App',
        data() {
            return {
                name: '',
                age: '',
                
                peoples: [],
                showFromLocal: false,
            }
        },
        watch: {
        },
        mounted: function () {
            if (localStorage.age) {
                this.savedAge = localStorage.age;
            }
            if (localStorage.fullNameArr) {
                this.peoples = JSON.parse(localStorage.fullNameArr);
                this.showFromLocal = true;
            }
        },
        components: {
            draggable,
        },
        methods: {
            addNew() {
                this.peoples.push({
                    nameFirst: this.name.split(' ')[2],
                    nameSecond: this.name.split(' ')[1],
                    nameLast: this.name.split(' ')[0],
                    savedAge: this.age
                });
                this.showFromLocal = true;

                localStorage.fullNameArr = JSON.stringify(this.peoples);
                console.log(localStorage.fullNameArr);
                //JSON.parse(localStorage.fullNameArr)
            },
            clear() {
                this.peoples = [];
                localStorage.clear();
                this.showFromLocal = false;
            },
            clearInput() {
                this.name = this.age = '';
            },
            deleteChelik(index) {      
	            this.peoples.splice(index, 1);
	            console.log(this.peoples);
	            console.log(index);
                // let test = JSON.parse(localStorage.fullNameArr);
                // test.splice(index, 1);
                localStorage.fullNameArr = JSON.stringify(this.peoples);
                if (this.peoples.length == 0) {
                    this.clear();
                }
            }
        },
        created() {
        }
    }


    // import TodoList from '../todo-list/list.vue'
    // import TodoInput from '../todo-input/input.vue'

    // export default {
    //     name: 'App',
    //     data() {
    //         return {
    //             toDoses: [],
    //             addTodoItem: (value) => {
    //                 if (value.length > 0) {
    //                     let data = new Date();
    //                     this.toDoses.push({
    //                         id: data.getTime(),
    //                         name: value,
    //                         done: false,
    //                     })
    //                 }
    //             },
    //             doneUndoneItem: (idx, donex) => {
    //                 const el = this.toDoses.findIndex((el) => el.id === idx);

    //                 this.toDoses = this.toDoses.map(({id, name, done}) => {
    //                     if (idx === id) {
    //                         return {
    //                             id,
    //                             name,
    //                             done: donex
    //                         }
    //                     } else {
    //                         return {
    //                             id,
    //                             name,
    //                             done

    //                         }
    //                     }
    //                 });
    //             },

    //         }
    //     },
    //     watch: {
    //         toDoses: (val, oldVal) => {
    //             console.log(val, oldVal);
    //             window.localStorage.setItem('localToDoses', JSON.stringify(val))
    //         }
    //     },
    //     mounted: function () {
    //         let local = window.localStorage.getItem('localToDoses');
    //         console.log(this.toDoses);
    //         if (JSON.parse(local)) {
    //             this.toDoses = JSON.parse(local)
    //         }
    //     },
    //     components: {
    //         TodoList,
    //         TodoInput
    //     },
    //     created() {
    //     }
    // }

</script>