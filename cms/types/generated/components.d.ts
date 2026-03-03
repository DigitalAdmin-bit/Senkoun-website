import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAccordion extends Struct.ComponentSchema {
  collectionName: 'components_shared_accordions';
  info: {
    displayName: 'accordion';
    icon: 'archive';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
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
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
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
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<10>;
    review_link: Schema.Attribute.String;
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

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    displayName: 'location';
  };
  attributes: {
    description: Schema.Attribute.Text;
    lat: Schema.Attribute.String;
    log: Schema.Attribute.String;
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

export interface SharedReviews extends Struct.ComponentSchema {
  collectionName: 'components_shared_reviews';
  info: {
    displayName: 'reviews';
  };
  attributes: {
    by: Schema.Attribute.String;
    content: Schema.Attribute.Text;
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
    period: Schema.Attribute.Enumeration<['hour', 'yearly', 'monthly']>;
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
    accordions: Schema.Attribute.Component<'shared.accordion', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String &
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
      'shared.location': SharedLocation;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.reviews': SharedReviews;
      'shared.rich-text': SharedRichText;
      'shared.salary': SharedSalary;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.spaces': SharedSpaces;
      'shared.tags': SharedTags;
      'shared.team': SharedTeam;
      'shared.text': SharedText;
      'shared.what-we-offer': SharedWhatWeOffer;
    }
  }
}
