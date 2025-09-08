Berikut adalah langkah-langkah untuk menjalankan dan menghubungkan `@vhiweb/magami-client-js` dalam proyek menggunakan **npm**:

---

# 📘 Setup `@vhiweb/magami-client-js` untuk Proyek Magami

## 🚀 **Langkah 1: Build dan Link `magami-client-js`**

1. **Masuk ke direktori proyek `magami-client-js`**

    ```sh
    cd path/to/magami-client-js
    ```

2. **Build proyek `magami-client-js`**

    ```sh
    npm run build
    ```

3. **Install yalc globally (if not installed)**

    ```sh
    npm install -g yalc
    ```

4. **Publish package to yalc registry**

    ```sh
    yalc publish
    ```

    **Atau jika ingin langsung update ke magami-template, gunakan:**

    ```sh
    yalc push
    ```

    > 💡 **Catatan**: Menggunakan `yalc push` akan otomatis melakukan publish dan add ke magami-template, sehingga tidak perlu menjalankan `yalc add @vhiweb/magami-client-js` lagi.

---

## 🔗 **Langkah 2: Link `magami-client-js` ke Proyek Magami**

1. **Masuk ke direktori proyek Magami**

    ```sh
    cd path/to/magami-project
    ```

2. **Hapus SDK `magami-client-js` yang ada di `package.json` (jika ada)**

    - **Edit `package.json`**, hapus dependency `"@vhiweb/magami-client-js"`
    - Jalankan:
        ```sh
        npm install
        ```
        atau jika ada masalah dependency:
        ```sh
        npm install --legacy-peer-deps
        ```

3. **Link package `@vhiweb/magami-client-js` ke proyek Magami**
    ```sh
    yalc add @vhiweb/magami-client-js
    ```

---

## ⚠️ **Catatan Penting**

-   **Gunakan `npm`, jangan gunakan `yarn`** karena ada kendala kompatibilitas.
-   Jika mengalami error saat `npm install`, cek file `.npmrc` di root direktori `magami-client-js` dan **komentari isinya**, lalu coba jalankan ulang:
    ```sh
    npm install
    ```
    atau:
    ```sh
    npm install --legacy-peer-deps
    ```

---

## 📦 **Langkah 3: Publish `magami-client-js` ke NPM**

1. **Merge perubahan ke branch `master`**

    ```sh
    git checkout master
    git merge feature-branch
    git push origin master
    ```

2. **Masuk kembali ke `magami-client-js`**

    ```sh
    cd path/to/magami-client-js
    ```

3. **Update version di package.json (jika diperlukan)**

    ```sh
    npm version patch
    # atau npm version minor
    # atau npm version major
    ```

4. **Publish package ke NPM dengan akses publik**
    ```sh
    npm publish --access public
    ```

---

## 🔧 **Development Workflow**

### Untuk Development Lokal:

1. Build project: `npm run build`
2. Watch mode untuk auto-rebuild: `npm run build:watch`
3. Test: `npm run test:run` atau `npm run test:watch`

### Untuk Testing di Project Lain:

1. Gunakan `yalc push` untuk update otomatis
2. Di project target, jalankan `yalc update @vhiweb/magami-client-js`

**Selesai! 🎉**
