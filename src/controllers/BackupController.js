import Backup from '../models/Backup';

class BackupController {
    async listAll(page) {
        const backups = await Backup.findAll(page);
        return backups;
    }

    async add(tipo, data_entrada) {
        const backup = new Backup(tipo, data_entrada);
        try {
            await backup.create();
            return "Backup criado com sucesso!";
        } catch (e) {
            return err;
        }
    }

    async findById(id) {
        const backup = await Backup.findById(id);
        if (backup.length > 0) {
            return backup[0];
        } else {
            return "Backup com esse id não encontrado!";
        }
    }

    async remove(id) {
        const backupdeleted = await Backup.delete(id)
        if (backupdeleted == 1) {
            return "Backup deletado com sucesso!"
        } else {
            return "Backup com esse id não encontrado!";
        }
    }
}

export default new BackupController();