import { HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "../../../routes/account/profile/profile.component";
import { ProfileService } from "../../../routes/account/profile/profile.service";
import { UserService } from "../../services/user.service";
import { UserPresentationService } from "../../components/user-presentation/user-presentation.service";
import { ConfigService } from "../../services/config.service";
import { HandleErrorService } from "../../services/handle-error.service";
import { ACCOUNT_BASE_URL, USER_BASE_URL } from "../../utils/constants/util-constants";
import { RouterModule } from "@angular/router";
import { of } from "rxjs";

describe('Profile component', () => {
  // Mock services
  const mockConfigService = {
    apiUrl: 'http://localhost:8081/api',
    mapboxToken: 'test-mapbox-token',
    stripeToken: 'test-stripe-token',
    loadConfig: () => Promise.resolve(),
    getConfig: () => ({
      apiUrl: 'http://localhost:8081/api',
      mapboxToken: 'test-mapbox-token',
      stripeToken: 'test-stripe-token'
    })
  };

  const mockProfileService = {
    getUserPreferredSchedules: () => of([]),
    getPreferredMeetingPlaces: () => of([])
  };

  const mockUserService = {
    getUserAliasAndLocation: () => of({ alias: 'supercalifragilisticexpialidocious', city: 'Test City' })
  };

  const mockUserPresentationService = {
    getUserPresentation: () => of({
      id: 1,
      alias: 'supercalifragilisticexpialidocious',
      bio: 'Test bio',
      street: 'Test street',
      postalCode: '75001',
      city: 'Paris',
      inscriptionDate: '2024-01-01',
      profilePicture: 'test.jpg'
    })
  };

  beforeEach(() => {
    // Set localStorage BEFORE mounting the component
    localStorage.setItem('userId', '1');
    localStorage.setItem('userAlias', 'supercalifragilisticexpialidocious');

    // Mount component with mocked services
    cy.mount(ProfileComponent, {
      imports: [HttpClientModule, RouterModule.forRoot([])],
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
        { provide: UserService, useValue: mockUserService },
        { provide: UserPresentationService, useValue: mockUserPresentationService },
        { provide: ConfigService, useValue: mockConfigService },
        HandleErrorService
      ],
    });

    // Wait for component to render
    cy.wait(100);
  });

  it('should display user profile information', () => {
    // Check that the profile page loaded
    cy.get('#profil-page').should('exist');

    // Check that presentation section exists
    cy.get('#presentation').should('exist');
  });

  it('should display edit buttons for all sections', () => {
    // Check edit button for presentation
    cy.get('#presentation #edit-button-container .btn-icon').should('exist');

    // Check edit button for schedule
    cy.get('#schedule #edit-button-container .btn-icon').should('exist');

    // Check edit button for meeting places
    cy.get('#meeting-places #edit-button-container .btn-icon').should('exist');
  });

  it('should toggle edit mode when clicking edit buttons', () => {
    // Click edit button for presentation
    cy.get('#presentation #edit-button-container .btn-icon').click();
    cy.get('#presentation #edit-button-container .save-icon').should('be.visible');
  });
});
