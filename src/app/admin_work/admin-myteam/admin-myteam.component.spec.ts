import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMyteamComponent } from './admin-myteam.component';

describe('AdminMyteamComponent', () => {
  let component: AdminMyteamComponent;
  let fixture: ComponentFixture<AdminMyteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMyteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMyteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
