<template>
  <div class="specialist-timetables-hours">
    <div class="header">
      <h2>Disponibilizar Horários</h2>
      <p>Selecione os dias e horários que você estará disponível para mentorias</p>
    </div>

    <div class="calendar-section">
      <q-date
        v-model="selectedDate"
        :options="dateOptions"
        @input="onDateSelect"
        class="calendar"
      />
    </div>

    <div v-if="selectedDate" class="hours-section">
      <h3>Horários para {{ formatDate(selectedDate) }}</h3>
      
      <div class="time-slots">
        <div 
          v-for="hour in availableHours" 
          :key="hour"
          class="time-slot"
          :class="{ 'selected': isHourSelected(hour) }"
          @click="toggleHour(hour)"
        >
          {{ hour }}:00
        </div>
      </div>

      <div class="actions">
        <q-btn 
          color="primary" 
          @click="saveHours"
          :loading="saving"
          :disable="selectedHours.length === 0"
        >
          Salvar Horários
        </q-btn>
      </div>
    </div>

    <div v-if="savedTimetables.length > 0" class="saved-section">
      <h3>Horários Salvos</h3>
      <div class="saved-list">
        <div 
          v-for="timetable in savedTimetables" 
          :key="timetable.id"
          class="saved-item"
        >
          <span>{{ formatDate(timetable.date) }} - {{ timetable.hours.join(', ') }}h</span>
          <q-btn 
            flat 
            color="negative" 
            icon="delete"
            @click="removeTimetable(timetable.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialistProvidesTimetablesHours',
  data() {
    return {
      selectedDate: null,
      selectedHours: [],
      availableHours: [8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20],
      savedTimetables: [],
      saving: false
    }
  },
  methods: {
    dateOptions(date) {
      const today = new Date()
      const selectedDate = new Date(date)
      return selectedDate >= today
    },
    
    onDateSelect(date) {
      this.selectedDate = date
      this.selectedHours = []
      this.loadExistingHours(date)
    },
    
    toggleHour(hour) {
      const index = this.selectedHours.indexOf(hour)
      if (index > -1) {
        this.selectedHours.splice(index, 1)
      } else {
        this.selectedHours.push(hour)
      }
    },
    
    isHourSelected(hour) {
      return this.selectedHours.includes(hour)
    },
    
    async saveHours() {
      if (this.selectedHours.length === 0) return
      
      this.saving = true
      try {
        const payload = {
          date: this.selectedDate,
          hours: this.selectedHours,
          specialistId: this.getSpecialistId()
        }
        
        await this.$api.post('/specialist/timetables', payload)
        
        this.$q.notify({
          type: 'positive',
          message: 'Horários salvos com sucesso!'
        })
        
        this.loadSavedTimetables()
        this.selectedHours = []
        
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao salvar horários'
        })
      } finally {
        this.saving = false
      }
    },
    
    async loadExistingHours(date) {
      try {
        const response = await this.$api.get(`/specialist/timetables/${date}`)
        this.selectedHours = response.data.hours || []
      } catch (error) {
        console.error('Erro ao carregar horários existentes:', error)
      }
    },
    
    async loadSavedTimetables() {
      try {
        const response = await this.$api.get('/specialist/timetables')
        this.savedTimetables = response.data
      } catch (error) {
        console.error('Erro ao carregar horários salvos:', error)
      }
    },
    
    async removeTimetable(id) {
      try {
        await this.$api.delete(`/specialist/timetables/${id}`)
        this.$q.notify({
          type: 'positive',
          message: 'Horário removido com sucesso!'
        })
        this.loadSavedTimetables()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao remover horário'
        })
      }
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('pt-BR')
    },
    
    getSpecialistId() {
      return localStorage.getItem('userId')
    }
  },
  
  mounted() {
    this.loadSavedTimetables()
  }
}
</script>

<style lang="scss" scoped>
.specialist-timetables-hours {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  
  h2 {
    color: #1a27b7;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
  }
}

.calendar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  
  .calendar {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
}

.hours-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  
  h3 {
    color: #1a27b7;
    margin-bottom: 20px;
  }
}

.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.time-slot {
  padding: 12px;
  text-align: center;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1a27b7;
    background-color: #f5f5ff;
  }
  
  &.selected {
    background-color: #1a27b7;
    color: white;
    border-color: #1a27b7;
  }
}

.actions {
  text-align: center;
}

.saved-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  h3 {
    color: #1a27b7;
    margin-bottom: 20px;
  }
}

.saved-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.saved-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 6px;
  border-left: 4px solid #1a27b7;
}
</style>