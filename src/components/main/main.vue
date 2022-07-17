<template>
  <div class="main">

      <div class="todo-app">

        <div class="chelik-input">
           <div>
                Фамилия челика: <input v-model="nameSecond">
            </div>
            <div>
                Имя челика: <input v-model="nameFirst">
            </div>
            <div>
                Отчество челика: <input v-model="nameLast">
            </div>
            <div>
                Возраст челика: <input v-model="age">
            </div>
        </div>

        <button v-on:click="addNew">Добавить</button>
        <button v-on:click="clearInput">Очисить ввод</button>
        <button v-on:click="showJson">Загрузить даныне из JSON примера</button>

        <div v-if="showFromLocal" class="chelik-table">
            <div class="chelik-info__wrap">
                <div class="chelik-info__title">Запомнено</div>
                <div class="chelik-info__properties-list">
                    <div class="chelik-info__properties-index">Номер:</div>
                    <div class="chelik-info__properties-name">ФИО:</div>
                    <div class="chelik-info__properties-age">Возраст:</div>
                    <div class="chelik-info__properties-blank"></div>
                </div>
                <draggable v-model="peoples" group="peoples" tag="div" ghost-class="moving-item" class="chelik-info__list">
      
                    <div v-for="(chelik,index) in peoples" :key="chelik.nameFirst" class="chelik-info__item">
                        <div class="chelik-info__item-index">{{ index + 1 }}</div>
                        <div class="chelik-info__item-name">
                            <span v-if="chelik.nameSecond"> {{ chelik.nameSecond }}</span>
                            <span v-if="chelik.nameFirst">{{ chelik.nameFirst }}</span>
                            <span v-if="chelik.nameLast"> {{ chelik.nameLast }}</span>
                        </div>
                        <div class="chelik-info__item-age"><span v-if="chelik.savedAge">{{ chelik.savedAge }}</span></div>
                        <div class="chelik-info__item-del"><button v-on:click="deleteChelik(index)">X</button></div>
                    </div>
                </draggable>
            </div>
            <button v-on:click="clearLocal">Очистить</button>
        </div>

      </div>

  </div>
</template>

<style lang="scss" src="./main.scss"></style>

<script>
    import json from './peoples.json'
    import draggable from 'vuedraggable'

    export default {
        name: 'App',
        data() {
            return {
                nameFirst: '',
                nameSecond: '',
                nameLast: '',
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
            if (localStorage.peoplesLocal) {
                this.peoples = JSON.parse(localStorage.peoplesLocal);
                this.showFromLocal = true;
            }
            console.log(localStorage.peoplesLocal);
        },
        components: {
            draggable,
        },
        methods: {
            showJson() {      
	            this.peoples = json;
                this.showFromLocal = true;
                localStorage.peoplesLocal = JSON.stringify(this.peoples);
            },
            addNew() {
                this.peoples.push({
                    nameFirst: this.nameFirst,
                    nameSecond: this.nameSecond,
                    nameLast: this.nameLast,
                    savedAge: this.age
                });
                this.showFromLocal = true;

                localStorage.peoplesLocal = JSON.stringify(this.peoples);
                console.log(localStorage.peoplesLocal);
                //JSON.parse(localStorage.peoplesLocal)
            },
            clearLocal() {
                this.peoples = [];
                localStorage.clear();
                this.showFromLocal = false;
            },
            clearInput() {
                this.nameFirst = this.nameSecond = this.nameLast = this.age = '';
            },
            deleteChelik(index) {      
	            this.peoples.splice(index, 1);
	            console.log(this.peoples);
	            console.log(index);
                localStorage.peoplesLocal = JSON.stringify(this.peoples);
                if (this.peoples.length == 0) {
                    this.clearLocal();
                }
            }
        },
        created() {
        }
    }
</script>