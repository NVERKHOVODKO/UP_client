class User {
    constructor(id, login, password, email, creationDate, modificationDate, isDeleted, isBlocked, roleId, salt) {
      this.Id = id;
      this.Login = login;
      this.Password = password;
      this.Email = email;
      this.CreationData = creationDate;
      this.ModificationDate = modificationDate;
      this.IsDeleted = isDeleted;
      this.IsBlocked = isBlocked;
      this.RoleId = roleId;
      this.Salt = salt;
    }
  }