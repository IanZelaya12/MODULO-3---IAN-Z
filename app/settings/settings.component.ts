import { Component, OnInit } from '@angular/core';
import { AppSettings } from '@nativescript/core'; 

@Component({
    selector: 'Settings',
    template: `
        <StackLayout class="p-20">
            <Label text="Configuración de Usuario" class="h1"></Label>
            <TextField hint="Nuevo Nombre de Usuario" [(ngModel)]="localUserName" class="input"></TextField>
            <Button text="Guardar Nombre de Usuario" (tap)="saveUserName()" class="btn btn-primary"></Button>
            <Label [text]="'Nombre guardado: ' + currentUserName" class="h2 m-t-10"></Label>
        </StackLayout>
    `,
})
export class SettingsComponent implements OnInit {
    currentUserName: string = '';
    localUserName: string = '';

    ngOnInit(): void {
        // 5. Lectura persistente
        this.currentUserName = AppSettings.getString('userName', 'No configurado');
        this.localUserName = this.currentUserName;
    }

    // 6. Persistir con AppSettings
    saveUserName() {
        if (this.localUserName) {
            AppSettings.setString('userName', this.localUserName);
            this.currentUserName = this.localUserName;
            alert('Nombre de usuario guardado exitosamente!');
        }
    }
}
