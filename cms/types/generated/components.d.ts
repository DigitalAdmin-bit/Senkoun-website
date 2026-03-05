import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAccordion extends Struct.ComponentSchema {
  collectionName: 'components_shared_accordions';
  info: {
    displayName: 'accordion';
    icon: 'archive';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAuthor extends Struct.ComponentSchema {
  collectionName: 'components_shared_authors';
  info: {
    displayName: 'author';
  };
  attributes: {
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCarehomeWidget extends Struct.ComponentSchema {
  collectionName: 'components_shared_carehome_widgets';
  info: {
    displayName: 'carehome-widget';
    icon: 'apps';
  };
  attributes: {
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<10>;
    review_link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCqcWidget extends Struct.ComponentSchema {
  collectionName: 'components_shared_cqc_widgets';
  info: {
    displayName: 'cqc_widget';
  };
  attributes: {
    rating: Schema.Attribute.String;
    report_link: Schema.Attribute.String;
  };
}

export interface SharedDateRange extends Struct.ComponentSchema {
  collectionName: 'components_shared_date_ranges';
  info: {
    displayName: 'date-range';
  };
  attributes: {
    end_date: Schema.Attribute.Date;
    end_time: Schema.Attribute.Time;
    start_date: Schema.Attribute.Date;
    start_time: Schema.Attribute.Time;
  };
}

export interface SharedEvent extends Struct.ComponentSchema {
  collectionName: 'components_shared_events';
  info: {
    displayName: 'event';
  };
  attributes: {
    home: Schema.Attribute.Relation<'oneToOne', 'api::home.home'>;
  };
}

export interface SharedFacilities extends Struct.ComponentSchema {
  collectionName: 'components_shared_facilities';
  info: {
    displayName: 'facilities';
  };
  attributes: {
    cafe: Schema.Attribute.Boolean;
    close_to_local_shops: Schema.Attribute.Boolean;
    description: Schema.Attribute.Text;
    gardens: Schema.Attribute.Boolean;
    lift: Schema.Attribute.Boolean;
    near_public_transport: Schema.Attribute.Boolean;
    on_site_parking: Schema.Attribute.Boolean;
    pet_friendly: Schema.Attribute.Boolean;
    private_hair_salon: Schema.Attribute.Boolean;
    residents_kitchenette: Schema.Attribute.Boolean;
    television_point_in_own_room: Schema.Attribute.Boolean;
    wheelchair_access: Schema.Attribute.Boolean;
    wifi: Schema.Attribute.Boolean;
  };
}

export interface SharedHowItWorks extends Struct.ComponentSchema {
  collectionName: 'components_shared_how_it_works';
  info: {
    displayName: 'how-it-works';
  };
  attributes: {
    cover_image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"We can work quickly to find a solution that helps you get started on your care journey without delay, but don't worry, the decisions you make now can be adapted as your loved one's needs change. Reach out to learn how our flexible care could help make things easier straight away.">;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    displayName: 'location';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    lat: Schema.Attribute.String & Schema.Attribute.Required;
    log: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMeetOurTeam extends Struct.ComponentSchema {
  collectionName: 'components_shared_meet_our_teams';
  info: {
    displayName: 'meet-our-team';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedQuestions extends Struct.ComponentSchema {
  collectionName: 'components_shared_questions';
  info: {
    displayName: 'questions';
    icon: 'question';
  };
  attributes: {
    description: Schema.Attribute.Text;
    options: Schema.Attribute.Text;
    question_type: Schema.Attribute.Enumeration<
      ['short_text', 'long_text', 'select', 'checkbox', 'date']
    > &
      Schema.Attribute.Required;
    required: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedResponses extends Struct.ComponentSchema {
  collectionName: 'components_shared_responses';
  info: {
    displayName: 'responses';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.Text & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['short_text', 'long_text', 'select', 'checkbox', 'date']
    >;
  };
}

export interface SharedReviews extends Struct.ComponentSchema {
  collectionName: 'components_shared_reviews';
  info: {
    displayName: 'reviews';
  };
  attributes: {
    by: Schema.Attribute.String;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSalary extends Struct.ComponentSchema {
  collectionName: 'components_shared_salaries';
  info: {
    displayName: 'salary';
  };
  attributes: {
    amount: Schema.Attribute.Decimal;
    period: Schema.Attribute.Enumeration<
      ['hour', 'weekly', 'yearly', 'monthly']
    >;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSpaces extends Struct.ComponentSchema {
  collectionName: 'components_shared_spaces';
  info: {
    displayName: 'spaces';
    icon: 'house';
  };
  attributes: {
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Media<'images', true>;
    name: Schema.Attribute.String;
  };
}

export interface SharedSupportCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_support_cards';
  info: {
    displayName: 'support-cards';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSupports extends Struct.ComponentSchema {
  collectionName: 'components_shared_supports';
  info: {
    displayName: 'supports';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.support-cards', true>;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'At SENKOUN Care Home, we offer two types of home care: hourly care, with visits at agreed times, and live-in care, where a dedicated carer stays in your home. Both services are managed by our experienced care management team and delivered by compassionate Care Professionals.  Every care package is carefully tailored, combining the right mix of services to meet your individual needs and preferences.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Supporting Your Loved Ones'>;
  };
}

export interface SharedTags extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'tags';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedTeam extends Struct.ComponentSchema {
  collectionName: 'components_shared_teams';
  info: {
    displayName: 'team';
  };
  attributes: {
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface SharedTeamCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_cards';
  info: {
    displayName: 'team-card';
    icon: 'lightbulb';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    Text: Schema.Attribute.String;
  };
}

export interface SharedWhatWeOffer extends Struct.ComponentSchema {
  collectionName: 'components_shared_what_we_offers';
  info: {
    displayName: 'what_we_offer';
  };
  attributes: {
    accordions: Schema.Attribute.Component<'shared.accordion', true> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'At SENKOUN, our domiciliary care visits help your loved one live independently and comfortably at home. We provide personalised support tailored to individual needs \u2014 from companionship and help with household tasks to personal and more complex care.  Our experienced Care Professionals deliver compassionate, reliable care that gives families peace of mind. We work closely with you to create a care plan that fits your routines and preferences, visiting at times that suit you \u2014 because at SENKOUN, it\u2019s always your choice.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'What We Will Offer'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.accordion': SharedAccordion;
      'shared.author': SharedAuthor;
      'shared.cards': SharedCards;
      'shared.carehome-widget': SharedCarehomeWidget;
      'shared.cqc-widget': SharedCqcWidget;
      'shared.date-range': SharedDateRange;
      'shared.event': SharedEvent;
      'shared.facilities': SharedFacilities;
      'shared.how-it-works': SharedHowItWorks;
      'shared.location': SharedLocation;
      'shared.media': SharedMedia;
      'shared.meet-our-team': SharedMeetOurTeam;
      'shared.questions': SharedQuestions;
      'shared.quote': SharedQuote;
      'shared.responses': SharedResponses;
      'shared.reviews': SharedReviews;
      'shared.rich-text': SharedRichText;
      'shared.salary': SharedSalary;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.spaces': SharedSpaces;
      'shared.support-cards': SharedSupportCards;
      'shared.supports': SharedSupports;
      'shared.tags': SharedTags;
      'shared.team': SharedTeam;
      'shared.team-card': SharedTeamCard;
      'shared.text': SharedText;
      'shared.what-we-offer': SharedWhatWeOffer;
    }
  }
}
