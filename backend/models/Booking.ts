export interface Booking {
    bookingid: number;
    userid: number;
    gameid: number;
    status: 'confirmed' | 'cancelled'; 
  }
  