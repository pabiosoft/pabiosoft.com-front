flowchart TD
%% Equipe IT
subgraph Equipe_DSI [Equipe DSI]
Dev[Developpeurs 25]
CP[Chefs de Projet 5]
SysAdmin[Administrateurs Systeme 10]
SRE[SRE 5]
Resp[Responsables 5]
end

    %% Applications
    subgraph Applications_Existantes [Applications Existantes]
        App1[Application gestion stock PHP/MySQL]
        App2[Application ventes magasin PHP/MySQL]
        App3[Application interne RH PHP/MySQL]
    end

    %% Methodologie
    Methodologie[Cycle en V]
    
    %% Serveurs et Infrastructure
    subgraph Infrastructure_Actuelle [Infrastructure Actuelle]
        Serveur1[Serveurs Virtuels]
        Hebergement[Hebergement francais]
    end

    %% Flux de developpement
    Planification[Planification]
    Dev_Code[Developpement]
    Test[Tests Manuels]
    Deploiement[Deploiement]

    %% Relations
    Equipe_DSI --> Planification
    Planification --> Dev_Code
    Dev_Code --> Test
    Test --> Deploiement
    Deploiement --> Infrastructure_Actuelle
    Infrastructure_Actuelle --> Applications_Existantes
    Applications_Existantes --> Utilisateurs

    %% Limitations Identifiees
    subgraph Limitations [Limitations]
        L1[Pas de CI/CD]
        L2[Infrastructure vieillissante]
        L3[Faible scalabilite]
        L4[Methodologie rigide]
    end

    Deploiement --> Limitations
