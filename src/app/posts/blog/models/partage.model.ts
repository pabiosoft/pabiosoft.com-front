export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  sharedGroups?: string[]; // IDs des groupes avec lesquels le blog est partagé
}

export interface ReadingGroup {
  id?: number | any; // ID du groupe, facultatif car généré par le serveur
  name: string; // Nom du groupe
  creatorId: number; // ID de l'utilisateur qui a créé le groupe
  members: number[]; // Liste des IDs des membres
  blogsShared: number[]; // Liste des IDs des blogs partagés
}

export interface Invitation {
  id: string;
  groupId: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
}
