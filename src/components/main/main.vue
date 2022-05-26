<template>
  <div class="todo-app">
    <p>
        Моё ФИО <input v-model="name">
        и мне <input v-model="age"> лет.
    </p>
    <button v-on:click="addNew">Добавить</button>
    <button v-on:click="clearInput">Очисить ввод</button>
    <div v-if="showFromLocal">

        <table class="chelik-info">
            <tr class="chelik-info-tr-main">
                <td colspan="4">Запомнено</td>
            </tr>
            <tr class="chelik-info-tr">
                <td>Номер:</td>
                <td>Фамилия:</td>
                <td>Имя:</td>
                <td>Отчество:</td>
                <td>Возраст:</td>
                <td ></td>
            </tr>
            <tr v-for="(chelik,index) in peoples" :key="chelik.nameFirst" class="chelik-info-tr">
                <td>{{ index + 1 }}</td>
                <td><span v-if="chelik.nameFirst">{{ chelik.nameFirst }}</span></td>
                <td><span v-if="chelik.nameSecond">{{ chelik.nameSecond }}</span></td>
                <td><span v-if="chelik.nameLast">{{ chelik.nameLast }}</span></td>
                <td><span v-if="chelik.savedAge">{{ chelik.savedAge }}</span></td>
                <td><button v-on:click="deleteChelik(index)">X</button></td>
            </tr>
        </table>
        <button v-on:click="clear">Очистить</button>
    </div>
  </div>
</template>

<style lang="scss" src="./main.scss"></style>

<script>
    import TodoList from '../todo-list/list.vue'
    import TodoInput from '../todo-input/input.vue'

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