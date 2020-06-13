import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeusuarioPage } from './homeusuario.page';

describe('HomeusuarioPage', () => {
  let component: HomeusuarioPage;
  let fixture: ComponentFixture<HomeusuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeusuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
