interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    country: string;
    city: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

interface Meta {
  seed: string;
  results: number;
  page: number;
}

interface UserApiResponse {
  results: User[];
  info: Meta;
}

export type { User, Meta, UserApiResponse };
